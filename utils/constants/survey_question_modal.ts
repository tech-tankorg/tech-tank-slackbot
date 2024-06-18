import type { View } from "@slack/types";

import { generateBlock } from "./survey_question_schema.ts";

export const survey_modal_schema = (user_id: string): View => {
  const question1 = generateBlock({
    type: "multi_select",
    question: "The Earth is flat.",
    id: "q1",
  });

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
    ],
  };
};
