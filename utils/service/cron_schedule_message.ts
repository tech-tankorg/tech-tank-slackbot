import { CronJob } from "cron";
import {
  CRON_FOR_SCHEDULE_MESSAGE,
  CRON_FOR_NEWSLETTER,
  CRON_EVERY_MONDAY_AT_10,
  CRON_FOR_MENTOR_CHECKUP,
  GENERAL_QUESTIONS_START_DATE,
  WONDER_WEDNESDAY_QUESTIONS_START_DATE,
  TORONTO_TIME_ZONE_IDENTIFIER,
} from "../constants/consts.ts";

import { getOffsetDay } from "../helpers/custom-date-fns.ts";

import { flatten_object } from "../helpers/flatten-object.ts";
import questions from "../constants/general-questions.json" assert { type: "json" };
import wonder_wednesday_questions from "../constants/wonder-wednesday-questions.json" assert { type: "json" };

import { channels } from "../config/channel-config.ts";

import { thoughtful_thursday_send_scheduled_message } from "../../src/Events/send-scheduled-message.ts";
import { wonder_wednesday_send_schedule_message } from "../../src/Events/wonder-wednesday-schedule-message.ts";

import { post_newsletter } from "../../src/Events/post_newsletter.ts";

import { mentor_checkup } from "src/Events/mentor_checkup.ts";

import { send_weekly_welcome_message } from "../../src/Events/weekly_welcome_message.ts";

const PREPPED_QUESTIONS = flatten_object(questions);

const job_1 = new CronJob(
  CRON_FOR_SCHEDULE_MESSAGE,
  () => {
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

    if (offset_date_thoughtful_thursdays % 119 === 0)
      void thoughtful_thursday_send_scheduled_message(
        PREPPED_QUESTIONS,
        channels.general,
        GENERAL_QUESTIONS_START_DATE,
        "thursday",
        1
      );

    if (offset_date_wonder_wednesdays % 119 === 0)
      void wonder_wednesday_send_schedule_message(
        wonder_wednesday_questions,
        channels.study,
        WONDER_WEDNESDAY_QUESTIONS_START_DATE,
        "wednesday",
        2
      );
  },
  null,
  false,
  TORONTO_TIME_ZONE_IDENTIFIER
);

// Turn on once newsletter is finished

const job_2 = new CronJob(
  CRON_FOR_NEWSLETTER,
  () => {
    void post_newsletter();
  },
  null,
  false,
  TORONTO_TIME_ZONE_IDENTIFIER
);

const job_3 = new CronJob(
  CRON_FOR_MENTOR_CHECKUP,
  () => {
    void mentor_checkup();
  },
  null,
  false,
  TORONTO_TIME_ZONE_IDENTIFIER
);

const job_4 = new CronJob(
  CRON_EVERY_MONDAY_AT_10,
  () => {
    void send_weekly_welcome_message();
  },
  null,
  false,
  TORONTO_TIME_ZONE_IDENTIFIER
);

job_1.start();
job_2.start();
job_3.start();
job_4.start();

console.log(job_1.running, job_2.running, job_3.running, job_4.running);
