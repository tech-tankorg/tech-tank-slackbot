import type { ScheduleMessage } from "../types/projectTypes.js";

export const remove_messages_schedule_for_past = (
  msg_lst: ScheduleMessage[]
) => {
  const now = new Date().getTime() / 1000;

  return msg_lst.filter((msg) => msg.post_at > now);
};
