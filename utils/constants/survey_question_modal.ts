import type { View } from "@slack/types";
import { generateBlock } from "./survey_question_schema.ts";
import { questions } from "./test_file.ts";
import { getRandomNumber } from "../helpers/generate-random-number.ts";

export const survey_modal_schema = (user_id: string): View => {
  const random_index_1 = getRandomNumber(0, questions.length);
  const random_index_2 = getRandomNumber(0, questions.length);
  const question1 = generateBlock(questions[random_index_1]);
  const question2 = generateBlock(questions[random_index_2]);

  return {
    type: "modal" as const,
    callback_id: "survey-modal",
    title: {
      type: "plain_text" as const,
      text: "Nemo Survey",
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
          type: "plain_text" as const,
          text: `Hey <@${user_id}>! Please complete the survey below`,
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      ...question1,
      ...question2,
    ],
  };
};
