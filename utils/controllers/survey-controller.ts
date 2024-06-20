import { prisma } from "../config/prisma.ts";

interface UserObj {
  user_id: string;
  quarter: number;
  question_1: { q: string; a: string };
  question_2: { q: string; a: string };
}

export const save_survey_response = async (user: UserObj) => {
  await prisma.survey.create({
    data: {
      user_id: user.user_id,
      quarter: user.quarter,
      response: { question_1: user.question_1, question_2: user.question_2 },
    },
  });
};

export const get_user_survey_response = async (user_id: string) => {
  return await prisma.survey.findMany({
    where: { user_id },
    select: { response: true, quarter: true, id: true },
  });
};

export const get_survey_results = async () => {
  return await prisma.survey.findMany({
    select: { created_at: true, quarter: true, response: true },
  });
};
