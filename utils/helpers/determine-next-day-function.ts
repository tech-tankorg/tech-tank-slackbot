import { nextWednesday, nextThursday } from "date-fns";
import type { day } from "../types/projectTypes.ts";

export const determine_next_day_function = (day: day) => {
  if (day === "wednesday") return nextWednesday;

  return nextThursday;
};
