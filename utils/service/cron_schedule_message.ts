import cron from "node-cron";
import {
  CRON_FOR_SCHEDULE_MESSAGE,
  GENERAL_QUESTIONS_START_DATE,
} from "../constants/consts.ts";

import { flatten_object } from "../helpers/flatten-object.ts";
import questions from "../constants/general-questions.json" assert { type: "json" };

import { channels } from "../config/channel-config.ts";

import { send_scheduled_message } from "../../src/Events/send-scheduled-message.ts";

const PREPPED_QUESTIONS = flatten_object(questions);

cron.schedule(CRON_FOR_SCHEDULE_MESSAGE, () => {
  send_scheduled_message(
    PREPPED_QUESTIONS,
    channels.general,
    GENERAL_QUESTIONS_START_DATE
  );
});
