import { format, startOfMonth, endOfMonth } from "date-fns";
import axios from "axios";
import { filter_dates_range } from "./custom-date-fns.ts";

const generate_sanity_newsletter = async (date: string) => {
  const encodedURI = encodeURIComponent(
    `*[_type=="letter" && scheduled_post_date=="${date}"]{letter_info[]->{title,description},letter_fyi[]->{title,description},letter_title,letter_description,scheduled_post_date}`
  );
  const API_REQ = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/production?query=${encodedURI}`;
  const req = await axios.get(API_REQ);

  return req.data.result[0];
};

const getUpcomingEvents = async () => {
  const API_REQ = `https://www.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALENDAR_ID}/events?key=${process.env.GOOGLE_CALENDAR_API_KEY}`;

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "https://www.googleapis.com/auth/calendar.events",
    },
  };

  const result = await axios.get(API_REQ, options);

  const events = result.data.items as any[];

  const start_of_month = startOfMonth(new Date());
  const end_of_month = endOfMonth(new Date());

  const filtered_upcoming_events = events.filter((event) => {
    const event_date_start = new Date(event.start.dateTime);

    return filter_dates_range(event_date_start, start_of_month, end_of_month);
  });

  return filtered_upcoming_events;
};

const transform_to_block = (section: any[]) => {
  return section.map((sec: any) => ({
    type: "section",
    text: {
      type: "mrkdwn",
      text: `${sec.title}\n ${sec.description}`,
    },
  }));
};

const transform_to_block_upcoming_events = (section: any[]) => {
  return section.map((sec: any) => ({
    type: "section",
    text: {
      type: "mrkdwn",
      text: `${format(new Date(sec.start.dateTime), "MMM do")} - ${format(
        new Date(sec.start.dateTime),
        "hh:mm a..aa"
      )} *${sec.summary}* \n\n${sec.description} \n\n Location/Event Link: ${
        sec.location
      }`,
    },
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
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Please join me in welcoming our 3 *new hires* to the Paper Company family! \n\n *Robert California*, CEO \n\n *Ryan Howard*, Temp \n\n *Erin Hannon*, Receptionist ",
        },
      },
      {
        type: "divider",
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: ":pushpin: Do you have something to include in the newsletter? Here's *how to submit content*.",
          },
        ],
      },
    ],
  };
};
