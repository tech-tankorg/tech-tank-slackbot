import { nextWednesday, nextThursday } from "date-fns";
import type { day } from "../types/projectTypes.ts";

export const determine_next_day_function = (repeat_day: day) => {
  if (repeat_day === "wednesday") return nextWednesday;

  return nextThursday;
};
