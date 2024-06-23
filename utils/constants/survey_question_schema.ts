import type { Block, KnownBlock } from "@slack/types";
import type { TypeOfQuestion } from "../types/projectTypes.ts";
import { international_timezone_formatter } from "../helpers/date/custom-date-fns.ts";

import { addWeeks } from "date-fns";

import { randomBytes } from "node:crypto";

import { TORONTO_TIME_ZONE_IDENTIFIER } from "./consts.ts";

const generate_values = (value = 16) => {
  return randomBytes(value).toString("hex");
};

const yes_or_no_schema = (question: string, id: string) => {
  return [
    {
      type: "section",
      block_id: `survey_nemo-yorn-action-block-${generate_values()}`,
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
        action_id: `survey_nemo-yorn-action-${generate_values()}`,
      },
    },
    {
      type: "context",
      block_id: `survey_nemo-yorn-context-block-${generate_values()}`,
      elements: [
        {
          type: "mrkdwn",
          text: id,
        },
      ],
    },
  ];
};

const multiple_choice_schema = (
  question: string,
  options: Array<string>,
  id: string
) => {
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
      block_id: `survey_nemo_mcq-action-block-${generate_values()}`,
      element: {
        type: "static_select",
        placeholder: {
          type: "plain_text",
          text: "Select an option",
          emoji: true,
        },
        options: all_options,
        action_id: `survey_nemo_mcq-action-${generate_values()}`,
      },
      label: {
        type: "plain_text",
        text: question,
        emoji: true,
      },
    },
    {
      type: "context",
      block_id: `survey_nemo-mcq-context-block-${generate_values()}`,
      elements: [
        {
          type: "mrkdwn",
          text: id,
        },
      ],
    },
  ];
};

const rating_schema = (question: string, id: string) => {
  const options = ["1", "2", "3", "4", "5"];

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
      block_id: `survey_nemo_rating-action-block-${generate_values()}`,
      element: {
        type: "static_select",
        placeholder: {
          type: "plain_text",
          text: "Select an option",
          emoji: true,
        },
        options: all_options,
        action_id: `survey_nemo_rating-action-${generate_values()}`,
      },
      label: {
        type: "plain_text",
        text: question,
        emoji: true,
      },
    },
    {
      type: "context",
      block_id: `survey_nemo-rating-context-block-${generate_values()}`,
      elements: [
        {
          type: "mrkdwn",
          text: id,
        },
      ],
    },
  ];
};

const short_answer_schema = (question: string, id: string) => {
  return [
    {
      type: "input",
      block_id: `short-answer-action-block-${generate_values()}`,
      element: {
        type: "plain_text_input",
        multiline: true,
        action_id: `short-answer-action-${generate_values()}`,
      },
      label: {
        type: "plain_text",
        text: question,
        emoji: true,
      },
    },
    {
      type: "context",
      block_id: `survey_nemo-short-answer-context-block-${generate_values()}`,
      elements: [
        {
          type: "mrkdwn",
          text: id,
        },
      ],
    },
  ];
};

const multi_select_schema = (
  question: string,
  options: Array<string>,
  id: string
) => {
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
      block_id: `multi-select-action-block-${generate_values}`,
      element: {
        type: "multi_static_select",
        placeholder: {
          type: "plain_text",
          text: "Select options",
          emoji: true,
        },
        options: all_options,
        action_id: `multi-select-action-${generate_values()}`,
      },
      label: {
        type: "plain_text",
        text: question,
        emoji: true,
      },
    },
    {
      type: "context",
      block_id: `survey_nemo-multi-select-context-block-${generate_values()}`,
      elements: [
        {
          type: "mrkdwn",
          text: id,
        },
      ],
    },
  ];
};

export const survey_intro_message = (user_id: string) => {
  const today = new Date();
  const two_weeks_from_today = addWeeks(today, 2);

  const formatted_date = new Intl.DateTimeFormat("en-CA", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(two_weeks_from_today);
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Hey <@${user_id}>, we want your input! Please take a moment to complete our 2-question survey by ${formatted_date}. You can get started by clicking the open button to start.`,
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
  question: TypeOfQuestion[0] | undefined
): Array<Block | KnownBlock> => {
  if (question === undefined)
    throw new Error("question object cannot be undefined");

  switch (question.type) {
    case "yes_or_no": {
      return yes_or_no_schema(question.question, question.id);
    }
    case "multiple_choice": {
      if (!question.options)
        throw new Error(
          "Options are to be provided for MCQ, and multiple selection questions "
        );

      return multiple_choice_schema(
        question.question,
        question.options,
        question.id
      );
    }
    case "rating": {
      return rating_schema(question.question, question.id);
    }
    case "short_answer": {
      return short_answer_schema(question.question, question.id);
    }
    case "multi_select": {
      if (!question.options)
        throw new Error(
          "Options are to be provided for MCQ, and multiple selection questions "
        );
      return multi_select_schema(
        question.question,
        question.options,
        question.id
      );
    }
    default:
      return [];
  }
};
