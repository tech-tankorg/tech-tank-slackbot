import { startOfMonth, endOfMonth, isAfter, addDays } from "date-fns";
import { generic_sort_array } from "../helpers/sort-array.ts";
import { filter_dates_range } from "../helpers/custom-date-fns.ts";
import type { google_cal_event } from "../types/projectTypes.ts";

import axios from "axios";

export const getUpcomingEvents_for_the_month = async (
  google_calendar_id: string,
  google_api_key: string
) => {
  const API_REQ = `https://www.googleapis.com/calendar/v3/calendars/${google_calendar_id}/events?key=${google_api_key}`;

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

export const getUpcomingEvents_upper_range = async (
  google_calendar_id: string,
  google_api_key: string,
  day_from_now: number
) => {
  const API_REQ = `https://www.googleapis.com/calendar/v3/calendars/${google_calendar_id}/events?key=${google_api_key}`;

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "https://www.googleapis.com/auth/calendar.events",
    },
  };

  const result = await axios.get(API_REQ, options);

  const events = result.data.items as google_cal_event[];

  const today = new Date();
  const upper_range_date = addDays(today, day_from_now);

  const filtered_upcoming_events = events.filter((event) => {
    const event_date_start = new Date(event.start.dateTime);
    const today = new Date();

    return (
      filter_dates_range(event_date_start, today, upper_range_date) &&
      isAfter(event_date_start, today)
    );
  });

  generic_sort_array(filtered_upcoming_events);

  return filtered_upcoming_events;
};
