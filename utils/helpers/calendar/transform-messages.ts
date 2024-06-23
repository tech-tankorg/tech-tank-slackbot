import type { google_cal_event } from "../../types/projectTypes.ts";

import { TECHTANK_EVENT_TAG } from "../../constants/consts.ts";

import { international_timezone_formatter } from "../date/custom-date-fns.ts";

import { find_web_address } from "./find-web-address.ts";

export const transform_to_block_upcoming_events = (
  section: google_cal_event
) => {
  const formatted_array = section.map((sec) => {
    const web_address = find_web_address(sec.description) ?? "#";

    const start_date_time = new Date(sec.start.dateTime);

    const start_date_time_formatted =
      international_timezone_formatter(start_date_time);

    if (sec.summary.includes(TECHTANK_EVENT_TAG)) {
      const title = sec.summary.replace(TECHTANK_EVENT_TAG, "");

      return `• *${start_date_time_formatted}*: :tech_tank:*TechTank Event*:tech_tank:*<${web_address}|${title}> @ ${sec.location}*\n`;
    }

    return `• ${start_date_time_formatted}: <${web_address}|${sec.summary}> @ ${sec.location}\n`;
  });

  return formatted_array.join("").trim();
};
