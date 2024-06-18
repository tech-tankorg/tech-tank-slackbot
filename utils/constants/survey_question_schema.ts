import type { Block, KnownBlock } from "@slack/types";
import type { TypeOfQuestion } from "../types/projectTypes.ts";

interface Questions {
  type: TypeOfQuestion[0]["type"];
  question: string;
  id: string;
}

const yes_or_no_schema = (question: string) => {
  return [
    {
      type: "section",
      block_id: "survey_nemo-yorn-action-block",
      text: {
        type: "mrkdwn",
        text: question,
      },
      accessory: {
        type: "radio_buttons",
        options: [
          {
            text: {
              type: "mrkdwn",
              text: "True",
            },
            value: "true",
          },
          {
            text: {
              type: "mrkdwn",
              text: "False",
            },
            value: "false",
          },
        ],
        action_id: "survey_nemo-yorn-action",
      },
    },
  ];
};

const multiple_choice_schema = (question: string, options: Array<string>) => {
  const all_options = options.map((option) => ({
    text: {
      type: "plain_text" as const,
      text: option,
      emoji: true,
    },
    value: option,
  }));

  return [
    {
      type: "input",
      block_id: "survey_nemo_mcq-action-block",
      element: {
        type: "static_select",
        placeholder: {
          type: "plain_text",
          text: "Select an option",
          emoji: true,
        },
        options: all_options,
        action_id: "survey_nemo_mcq-action",
      },
      label: {
        type: "plain_text",
        text: question,
        emoji: true,
      },
    },
  ];
};

const rating_schema = (question: string) => {
  const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const all_options = options.map((option) => ({
    text: {
      type: "plain_text" as const,
      text: option,
      emoji: true,
    },
    value: option,
  }));

  return [
    {
      type: "input",
      block_id: "survey_nemo_rating-action-block",
      element: {
        type: "static_select",
        placeholder: {
          type: "plain_text",
          text: "Select an option",
          emoji: true,
        },
        options: all_options,
        action_id: "survey_nemo_rating-action",
      },
      label: {
        type: "plain_text",
        text: question,
        emoji: true,
      },
    },
  ];
};

const short_answer_schema = (question: string) => {
  return [
    {
      type: "input",
      block_id: "short-answer-action-block",
      element: {
        type: "plain_text_input",
        multiline: true,
        action_id: "short-answer-action",
      },
      label: {
        type: "plain_text",
        text: question,
        emoji: true,
      },
    },
  ];
};

const multi_select_schema = (question: string, options: Array<string>) => {
  const all_options = options.map((option) => ({
    text: {
      type: "plain_text" as const,
      text: option,
      emoji: true,
    },
    value: option,
  }));

  return [
    {
      type: "input",
      block_id: "multi-select-action-block",
      element: {
        type: "multi_static_select",
        placeholder: {
          type: "plain_text",
          text: "Select options",
          emoji: true,
        },
        options: all_options,
        action_id: "multi-select-action",
      },
      label: {
        type: "plain_text",
        text: "Label",
        emoji: true,
      },
    },
  ];
};

export const survey_intro_message = (user_id: string) => {
  return [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: `Hey <@${user_id}>! Please complete the 2 question survey by clicking the open button!`,
        emoji: true,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "open",
            emoji: true,
          },
          value: "open survey modal",
          action_id: "open-survey-modal",
        },
      ],
    },
  ];
};

/* =============

    BELOW IS THE LOGIC FOR GENERATING A BLOCK

  =============
*/

export const generateBlock = (
  question: Questions
): Array<Block | KnownBlock> => {
  switch (question.type) {
    case "yes_or_no": {
      return yes_or_no_schema(question.question);
    }
    case "multiple_choice": {
      return multiple_choice_schema(question.question, [
        "option 1",
        "option 2",
        "option 3",
        "option4",
      ]);
    }
    case "rating": {
      return rating_schema(question.question);
    }
    case "short_answer": {
      return short_answer_schema(question.question);
    }
    case "multi_select": {
      return multi_select_schema(question.question, [
        "option 1",
        "option 2",
        "option 3",
        "option4",
      ]);
    }
    default:
      return [];
  }
};
