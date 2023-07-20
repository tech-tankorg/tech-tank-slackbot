import { format, startOfMonth } from "date-fns";
import { sanity_letter_info } from "../types/projectTypes.ts";
import { getUpcomingEvents } from "../service/google-calendar.ts";
import { generate_sanity_newsletter } from "../service/sanity-client.ts";
import type { google_cal_event } from "../types/projectTypes.ts";

const transform_to_block = (section: sanity_letter_info) => {
  return section.map((sec) => ({
    type: "section",
    text: {
      text: "---",
      type: "mrkdwn",
    },
    fields: [
      {
        type: "mrkdwn",
        text: `${sec.title}\n\n ${sec.description} \n \n`,
      },
    ],
  }));
};

const transform_to_block_upcoming_events = (section: google_cal_event[]) => {
  return section.map((sec) => ({
    type: "section",
    text: {
      text: "---",
      type: "mrkdwn",
    },
    fields: [
      {
        type: "mrkdwn",
        text: `:calendar: *${format(
          new Date(sec.start.dateTime),
          "MMM do"
        )} - ${format(new Date(sec.start.dateTime), "hh:mm aa")} | ${
          sec.summary
        }* \n\n Location/Event Link: ${sec.location} \n \n`,
      },
      {
        type: "mrkdwn",
        text: `${sec.description}`,
      },
    ],
  }));
};

export const generate_newsletter = async () => {
  const start_of_month = startOfMonth(new Date());
  const formatted_date = format(start_of_month, "MMMM yyyy");

  const request_format_date = format(start_of_month, "yyyy-MM-dd");

  const response = await Promise.all([
    generate_sanity_newsletter(request_format_date),
    getUpcomingEvents(),
  ]);

  const transform_block_fyi = transform_to_block(response[0].letter_fyi);
  const transform_block_info = transform_to_block(response[0].letter_info);

  const transform_block_upcoming_events = transform_to_block_upcoming_events(
    response[1]
  );

  return {
    mrkdwn: true,
    text: "say hello",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: ":newspaper: Nemo's Monthly Newsletter  :newspaper:",
        },
      },
      {
        type: "context",
        elements: [
          {
            text: formatted_date,
            type: "mrkdwn",
          },
        ],
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: " :loud_sound: *IN CASE YOU MISSED IT* :loud_sound:",
        },
      },

      ...transform_block_info,

      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":calendar: |   *UPCOMING EVENTS*  | :calendar: ",
        },
      },
      ...transform_block_upcoming_events,
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*FOR YOUR INFORMATION* :reminder_ribbon:",
        },
      },
      ...transform_block_fyi,
      {
        type: "divider",
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: ":pushpin: Your monthly newsletter brought to you by *Nemo* from *Tech Tank*.",
          },
        ],
      },
    ],
  };
};
