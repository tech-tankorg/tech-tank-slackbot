import type { ScheduleMessage } from "../types/projectTypes.ts";
import { MATCH_GREETING_MESSAGE } from "../constants/consts.ts";

export const check_if_message_is_scheduled = (
  msgs_to_be_scheduled: ScheduleMessage[],
  scheduled_messages: Array<string | undefined>
) => {
  const new_array: Array<{ channel: string; post_at: number; text: string }> =
    [];

  for (const msg of msgs_to_be_scheduled) {
    let isScheduled = false;

    for (const scheduledMsg of scheduled_messages) {
      if (scheduledMsg === undefined) break;

      const matches = msg.text.split(MATCH_GREETING_MESSAGE);

      if (scheduledMsg.includes(matches[1] ?? "")) {
        isScheduled = true;
        break;
      }
    }

    if (!isScheduled) {
      new_array.push({
        channel: msg.channel,
        text: msg.text,
        post_at: msg.post_at,
      });
    }
  }

  return new_array;
};
