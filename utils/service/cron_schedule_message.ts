import cron from "node-cron";
import {
  CRON_FOR_SCHEDULE_MESSAGE,
  CRON_FOR_NEWSLETTER,
  GENERAL_QUESTIONS_START_DATE,
  WONDER_WEDNESDAY_QUESTIONS_START_DATE,
} from "../constants/consts.ts";

import { getOffsetDay } from "../helpers/custom-date-fns.ts";

import { flatten_object } from "../helpers/flatten-object.ts";
import questions from "../constants/general-questions.json" assert { type: "json" };
import wonder_wednesday_questions from "../constants/wonder-wednesday-questions.json" assert { type: "json" };

import { channels } from "../config/channel-config.ts";

import { thoughtful_thursday_send_scheduled_message } from "../../src/Events/send-scheduled-message.ts";
import { wonder_wednesday_send_schedule_message } from "../../src/Events/wonder-wednesday-schedule-message.ts";

// import { post_newsletter } from "../../src/Events/post_newsletter.ts";

const PREPPED_QUESTIONS = flatten_object(questions);

cron.schedule(CRON_FOR_SCHEDULE_MESSAGE, () => {
  const start_date_thoughtful_thursdays = new Date(
    GENERAL_QUESTIONS_START_DATE
  );
  const start_date_wonder_wednesdays = new Date(
    WONDER_WEDNESDAY_QUESTIONS_START_DATE
  );
  const now = new Date();

  const offset_date_thoughtful_thursdays = getOffsetDay(
    start_date_thoughtful_thursdays,
    now
  );

  const offset_date_wonder_wednesdays = getOffsetDay(
    start_date_wonder_wednesdays,
    now
  );

  if (offset_date_thoughtful_thursdays % 119)
    thoughtful_thursday_send_scheduled_message(
      PREPPED_QUESTIONS,
      channels.general,
      GENERAL_QUESTIONS_START_DATE,
      "thursday"
    );

  if (offset_date_wonder_wednesdays % 119)
    wonder_wednesday_send_schedule_message(
      wonder_wednesday_questions,
      channels.study,
      WONDER_WEDNESDAY_QUESTIONS_START_DATE,
      "wednesday"
    );
});

//Turn on once newsletter is finished

// cron.schedule(CRON_FOR_NEWSLETTER, () => {
//   post_newsletter();
// });
