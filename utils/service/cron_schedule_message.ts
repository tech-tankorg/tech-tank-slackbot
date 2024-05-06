import { CronJob } from "cron";
import {
  CRON_EVERY_MONDAY_AT_10,
  CRON_FOR_NEWSLETTER,
  TORONTO_TIME_ZONE_IDENTIFIER,
  SHUFFLE_SETTINGS_ID,
} from "../constants/consts.ts";
import { find_shuffle_setting } from "../controllers/shuffle-bot-groups.ts";

import { post_newsletter } from "../../src/Events/post_newsletter.ts";
import { post_networking_calendar } from "src/Events/post_networking_calendar.ts";
import { coffee_chat_bot_shuffle } from "../../src/Events/shuffle_bot.ts";
import { post_thanks_message } from "../../src/Events/thanks.ts";
import { send_weekly_welcome_message } from "../../src/Events/weekly_welcome_message.ts";

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
  "0 10 * * *",
  async () => {
    const shuffle_setting = await find_shuffle_setting(SHUFFLE_SETTINGS_ID);

    if (!shuffle_setting) return;

    const shuffle_day = shuffle_setting.next_shuffle.getDay();
    const today = new Date().getDay();

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
    void post_networking_calendar();
  },
  null,
  false,
  TORONTO_TIME_ZONE_IDENTIFIER
);

job_2.start();
job_3.start();
job_4.start();

console.log(job_2.running, job_3.running, job_4.running);
