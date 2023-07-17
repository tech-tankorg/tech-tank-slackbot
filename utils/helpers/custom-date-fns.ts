import { isBefore, isAfter, format } from "date-fns";

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
