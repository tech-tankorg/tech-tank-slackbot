export const AXIOM_DATA_SET =
  process.env.NODE_ENV === "production" ? "slack-bot" : "slack-bot-dev";

export const GENERAL_QUESTIONS_START_DATE = "June 22, 2023 14:00:00 UTC";
export const WONDER_WEDNESDAY_QUESTIONS_START_DATE =
  "July 5, 2023 14:00:00 UTC";

export const CRON_FOR_SCHEDULE_MESSAGE = "0 0 * * *";
export const CRON_FOR_NEWSLETTER = "0 10 1 * *";
export const CRON_FOR_MENTOR_CHECKUP = "0 10 15 * *";
export const CRON_EVERY_MONDAY_AT_10 = "0 10 * * 1";
export const CRON_START_OF_QUARTER = "0 10 4 1,4,7,10 *";
export const CRON__TWOWEEKS_AFTERSTART_OF_QUARTER = "0 10 20 1,4,7,10 *";

export const MATCH_GREETING_MESSAGE =
  ":speech_balloon: Here's the question/post of the week:";

export const SUGGESTION_REGEX = /\/suggestion-(social|study|other)/i;
export const THANKS_CHANNEL_REGEX = /!(thanks|shoutout|yay|celebrate)/;
export const THANKS_CHANNEL_MESSAGE_VALIDATION_REGEX =
  /(?=.*(!thanks|!shoutout))(?!(.*(!thanks|!shoutout)){2,}).*$/;

export const THANKS_CHANNEL_MESSAGE_SEPARATOR_REGEX =
  /!(thanks|shoutout)\s(<@[^>]+>,?\s*)+/g;

export const USER_ID_REGEX = /^U[A-Z0-9]{10}$/;

export const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID ?? "";
export const GOOGLE_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY ?? "";
export const NON_INCLUSIVE_WORDS = /guys/i;

export const TORONTO_TIME_ZONE_IDENTIFIER = "America/Toronto";

export const TECHTANK_EVENT_TAG = "[TechTank Event]";

export const SHUFFLE_SETTINGS_ID =
  process.env.NODE_ENV === "production"
    ? "66381e5495544ad56e3dcda7"
    : "663809cdcc9c1bd843fcab92";
