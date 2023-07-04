import cron from "node-cron";
import {
  CRON_FOR_SCHEDULE_MESSAGE,
  GENERAL_QUESTIONS_START_DATE,
} from "../constants/consts.ts";

import { getOffsetDay } from "../helpers/generate-offset-date.ts";

import { flatten_object } from "../helpers/flatten-object.ts";
import questions from "../constants/general-questions.json" assert { type: "json" };

import { channels } from "../config/channel-config.ts";

import { send_scheduled_message } from "../../src/Events/send-scheduled-message.ts";

const PREPPED_QUESTIONS = flatten_object(questions);

cron.schedule(CRON_FOR_SCHEDULE_MESSAGE, () => {
  const start_date = new Date(GENERAL_QUESTIONS_START_DATE);
  const now = new Date();

  const offset_date = getOffsetDay(start_date, now);

  console.log(offset_date);

  if (offset_date % 119) {
    send_scheduled_message(
      PREPPED_QUESTIONS,
      channels.general,
      GENERAL_QUESTIONS_START_DATE
    );

    console.log("this block of code ran");
  }
});
