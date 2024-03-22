import { GOOGLE_API_KEY, GOOGLE_CALENDAR_ID } from "../constants/consts.ts";
import { get_upcoming_events_upper_ranges } from "../service/google-calendar.ts";
import { transform_to_block_upcoming_events } from "./transform-messages.ts";

import { addMonths, format, getMonth } from "date-fns";

type google_calendar = Awaited<
  ReturnType<typeof get_upcoming_events_upper_ranges>
>;
const construct_month_obj = (calendar: google_calendar, today: Date) => {
  const month_obj: Record<"this_month" | "next_month", google_calendar> = {
    this_month: [],
    next_month: [],
  };
  for (const event of calendar) {
    const start_date_time = new Date(event.start.dateTime);
    const month_of_event = getMonth(start_date_time);
    const current_month = getMonth(today);

    if (month_of_event > current_month) {
      month_obj.next_month.push(event);
    } else {
      month_obj.this_month.push(event);
    }
  }

  return month_obj;
};

export const generate_networking_post = async () => {
  const google_calendar = await get_upcoming_events_upper_ranges(
    GOOGLE_CALENDAR_ID,
    GOOGLE_API_KEY,
    20
  );

  const today = new Date();
  const next_month_date = addMonths(today, 1);

  const cal_object = construct_month_obj(google_calendar, today);

  const this_month_message = transform_to_block_upcoming_events(
    cal_object.this_month
  );
  const next_month_message = transform_to_block_upcoming_events(
    cal_object.next_month
  );

  if (cal_object.next_month.length > 0) {
    return [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: `:spiral_calendar_pad: ${format(
            today,
            "MMMM"
          )} Events:spiral_calendar_pad::`,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: this_month_message,
        },
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: `:spiral_calendar_pad: ${format(
            next_month_date,
            "MMMM"
          )} Events:spiral_calendar_pad::`,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: next_month_message,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*If you know of any other events please post them and I will add them to the calendar and keep updating weekly!*",
        },
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: ":sparkles: Subscribe to the events calendar to get all these events added automatically!",
          emoji: true,
        },
      },
    ];
  }

  return [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: `:spiral_calendar_pad: ${format(
          today,
          "MMMM"
        )} Events:spiral_calendar_pad::`,
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: this_month_message,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*If you know of any other events please post them and I will add them to the calendar and keep updating weekly!*",
      },
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: ":sparkles: Subscribe to the events calendar to get all these events added automatically!",
        emoji: true,
      },
    },
  ];
};

export const generate_network_calender = async () => {
  const google_calendar = await get_upcoming_events_upper_ranges(
    GOOGLE_CALENDAR_ID,
    GOOGLE_API_KEY,
    20
  );

  const today = new Date();
  const next_month_date = addMonths(today, 1);

  const cal_object = construct_month_obj(google_calendar, today);

  const this_month_message = transform_to_block_upcoming_events(
    cal_object.this_month
  );
  const next_month_message = transform_to_block_upcoming_events(
    cal_object.next_month
  );

  if (cal_object.next_month.length > 0) {
    return `:spiral_calendar_pad: ${format(
      today,
      "MMMM"
    )} Events:spiral_calendar_pad:\n\n${this_month_message}\n\n:spiral_calendar_pad: ${format(
      next_month_date,
      "MMMM"
    )} Events:spiral_calendar_pad::\n\n${next_month_message}\n\n*If you know of any other events please post them and I will add them to the calendar and keep updating weekly!*\n\n:sparkles: <https://calendar.google.com/calendar/u/2?cid=Y2ZkYTdjNmFjOGNlMGZjOWVhZjNhY2I5MjQxOTYwOGQ3YzNjYzliY2YzZWQ0OWI1ZjdjN2Q4YTEwNThmNjk3Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t|Subscribe to the events calendar> to get all these events added automatically!
    `;
  }

  return `:spiral_calendar_pad: ${format(
    today,
    "MMMM"
  )} Events:spiral_calendar_pad:\n\n${this_month_message}\n\n*If you know of any other events please post them and I will add them to the calendar and keep updating weekly!*\n\n:sparkles: <https://calendar.google.com/calendar/u/2?cid=Y2ZkYTdjNmFjOGNlMGZjOWVhZjNhY2I5MjQxOTYwOGQ3YzNjYzliY2YzZWQ0OWI1ZjdjN2Q4YTEwNThmNjk3Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t|Subscribe to the events calendar> to get all these events added automatically!
    `;
};
