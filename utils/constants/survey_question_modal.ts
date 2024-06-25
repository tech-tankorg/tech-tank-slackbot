import type { View } from "@slack/types";
import { generateBlock } from "./survey_question_schema.ts";
import { questions } from "./survey_questions.ts";
import { getRandomNumber } from "../helpers/general/generate-random-number.ts";

export const survey_modal_schema = (user_id: string): View => {
  const random_index_1 = getRandomNumber(0, questions.length);
  const random_index_2 = getRandomNumber(0, questions.length);

  const question_1 = questions[random_index_1];
  let question_2 = questions[random_index_2];

  if (
    question_1?.type === "short_answer" &&
    question_2?.type === "short_answer"
  ) {
    const new_question_lst = questions.filter(
      (question) => question.type !== "short_answer"
    );
    const random_index = getRandomNumber(0, new_question_lst.length);

    question_2 = new_question_lst[random_index];
  }

  const question1_block = generateBlock(question_1);
  const question2_block = generateBlock(question_2);

  return {
    type: "modal" as const,
    callback_id: "survey-modal",
    title: {
      type: "plain_text" as const,
      text: "How’s the TechTank Tide?",
      emoji: true,
    },
    submit: {
      type: "plain_text" as const,
      text: "Submit",
      emoji: true,
    },
    close: {
      type: "plain_text" as const,
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn" as const,
          text: `Hey <@${user_id}>! We rely on your support to continue our efforts, and we appreciate your time and insights! The feedback provided will remain *anonymous* and will only be visible to the admin team.`,
        },
      },
      {
        type: "divider",
      },
      ...question1_block,
      ...question2_block,
    ],
  };
};
