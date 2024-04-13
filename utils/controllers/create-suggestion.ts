import { prisma } from "../config/prisma.ts";

export const create_suggestion = async (
  suggestion: string,
  user_id: string,
  user_name: string
) => {
  await prisma.suggestions_bot.create({
    data: { suggestion, user_id, user_name },
  });
};
