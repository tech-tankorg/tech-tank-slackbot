import { CronJob } from "cron";
import {
  CRON_EVERY_MONDAY_AT_10,
  SHUFFLE_SETTINGS_ID,
  TORONTO_TIME_ZONE_IDENTIFIER,
} from "../constants/consts.ts";
import { find_shuffle_setting } from "../controllers/shuffle-bot-groups.ts";

import { coffee_chat_bot_shuffle } from "../../src/Events/shuffle_bot.ts";
import { post_thanks_message } from "../../src/Events/thanks.ts";
import { send_weekly_welcome_message } from "../../src/Events/weekly_welcome_message.ts";

import { getDate } from "date-fns";

const job_3 = new CronJob(
  "0 10 * * *",
  async () => {
    const shuffle_setting = await find_shuffle_setting(SHUFFLE_SETTINGS_ID);

    if (!shuffle_setting) return;

    const shuffle_day = getDate(shuffle_setting.next_shuffle);
    const today = getDate(new Date());

    if (shuffle_day === today) void coffee_chat_bot_shuffle();
  },
  null,
  false,
  TORONTO_TIME_ZONE_IDENTIFIER
);

const job_4 = new CronJob(
  CRON_EVERY_MONDAY_AT_10,
  () => {
    void send_weekly_welcome_message();
    void post_thanks_message();
  },
  null,
  false,
  TORONTO_TIME_ZONE_IDENTIFIER
);

job_3.start();
job_4.start();

console.log(job_3.running, job_4.running);
