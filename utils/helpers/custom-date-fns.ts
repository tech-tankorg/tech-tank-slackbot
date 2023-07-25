import {
  isBefore,
  isAfter,
  nextMonday,
  nextTuesday,
  nextWednesday,
  nextThursday,
  nextFriday,
  nextSaturday,
  nextSunday,
} from "date-fns";
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
