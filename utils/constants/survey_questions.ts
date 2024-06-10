type TypeOfQuestion = "true_or_false" | "rating" | "short_answer";
import type { Block, KnownBlock } from "@slack/types";

interface Questions {
  type: TypeOfQuestion;
  question: string;
  id: string;
}

const generateBlock = (question: Questions): Array<Block | KnownBlock> => {
  if (question.type === "true_or_false") {
    return [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: question.question,
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "False",
              emoji: true,
            },
            value: "click_me_123",
            action_id: "actionId-0",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "True",
              emoji: true,
            },
            value: "click_me_123",
            action_id: "actionId-1",
          },
        ],
      },
    ];
  }
  return [];
};
