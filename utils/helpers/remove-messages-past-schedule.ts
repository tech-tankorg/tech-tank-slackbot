import type { ScheduleMessage } from "../types/projectTypes.js";
import { addDays } from "date-fns";

export const remove_messages_schedule_for_past = (
  msg_lst: ScheduleMessage[]
) => {
  const now = new Date().getTime() / 1000;
  const one_hundred_ninteen_days_from_now =
    addDays(new Date(), 119).getTime() / 1000;

  return msg_lst.filter(
    (msg) =>
      msg.post_at > now && msg.post_at < one_hundred_ninteen_days_from_now
  );
};
