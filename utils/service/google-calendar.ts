import { startOfMonth, endOfMonth, isAfter } from "date-fns";
import { generic_sort_array } from "../helpers/sort-array.ts";
import { filter_dates_range } from "../helpers/custom-date-fns.ts";
import type { google_cal_event } from "../types/projectTypes.ts";

import axios from "axios";

export const getUpcomingEvents = async () => {
  const API_REQ = `https://www.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALENDAR_ID}/events?key=${process.env.GOOGLE_CALENDAR_API_KEY}`;

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "https://www.googleapis.com/auth/calendar.events",
    },
  };

  const result = await axios.get(API_REQ, options);

  const events = result.data.items as google_cal_event[];

  const start_of_month = startOfMonth(new Date());
  const end_of_month = endOfMonth(new Date());

  const filtered_upcoming_events = events.filter((event) => {
    const event_date_start = new Date(event.start.dateTime);
    const today = new Date();

    return (
      filter_dates_range(event_date_start, start_of_month, end_of_month) &&
      isAfter(event_date_start, today)
    );
  });

  generic_sort_array(filtered_upcoming_events);

  return filtered_upcoming_events;
};
