export const AXIOM_DATA_SET =
  process.env.NODE_ENV === "production" ? "slack-bot" : "slack-bot-dev";

export const GENERAL_QUESTIONS_START_DATE = "June 22, 2023 14:00:00 UTC";
export const WONDER_WEDNESDAY_QUESTIONS_START_DATE =
  "July 5, 2023 14:00:00 UTC";

export const CRON_FOR_SCHEDULE_MESSAGE = "0 0 * * * *";
export const CRON_FOR_NEWSLETTER = "0 10 1 * *";

export const MATCH_GREETING_MESSAGE =
  ":speech_balloon: Here's the question/post of the week:";

export const SUGGESTION_REGEX = /\/suggestion-(social|study|other)/i;

export const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID ?? "";
export const GOOGLE_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY ?? "";

export const TORONTO_TIME_ZONE_IDENTIFIER = "America/Toronto";
