import {
  isAfter,
  isBefore,
  nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday,
} from "date-fns";
import { TORONTO_TIME_ZONE_IDENTIFIER } from "../constants/consts.ts";
import type { day } from "../types/projectTypes.ts";

export const filter_dates_range = (
  date: Date,
  start_month_date: Date,
  end_month_date: Date
) => {
  return isAfter(date, start_month_date) && isBefore(date, end_month_date);
};

export const getOffsetDay = (start_date: Date, curr_date: Date): number => {
  const offSet = Math.floor(curr_date.valueOf() - start_date.valueOf());
  const toDaysConverter = 24 * 60 * 60 * 1000;

  const convertToDaysNumber = Math.abs(Math.floor(offSet / toDaysConverter));

  return convertToDaysNumber;
};

export const determine_next_day_function = (repeat_day: day) => {
  if (repeat_day === "monday") return nextMonday;
  if (repeat_day === "tuesday") return nextTuesday;
  if (repeat_day === "wednesday") return nextWednesday;
  if (repeat_day === "thursday") return nextThursday;
  if (repeat_day === "friday") return nextFriday;
  if (repeat_day === "saturday") return nextSaturday;
  if (repeat_day === "sunday") return nextSunday;

  return nextMonday;
};

export const determine_next_execute_date_freq = (
  date: Date,
  repeat_day: day,
  frequency: number
): Date => {
  // This is a recursive function that schedules the day at the appropriate frequency for

  if (frequency === 0) {
    return date;
  }

  const nextDate = determine_next_day_function(repeat_day);

  return determine_next_execute_date_freq(
    nextDate(date),
    repeat_day,
    frequency - 1
  );
};

export const international_timezone_formatter = (date: Date) => {
  const options = {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: TORONTO_TIME_ZONE_IDENTIFIER,
  } as const;

  const date_formatted = new Intl.DateTimeFormat("en-CA", options).format(date);

  return date_formatted;
};

export const convert_date = (time: {
  seconds: number;
  nanoseconds: number;
}) => {
  const milliseconds = time.seconds * 1000 + time.nanoseconds / 1000000;
  const utcDate = new Date(milliseconds);
  return utcDate;
};
