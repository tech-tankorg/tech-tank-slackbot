import type { ScheduleMessage } from "../types/projectTypes.js";
export const check_if_message_is_scheduled = (
  scheduled_msg: ScheduleMessage[],
  scheduled_messages: (string | undefined)[]
) => {
  const new_array: Array<{ channel: string; post_at: number; text: string }> =
    [];

  for (const msg of scheduled_msg) {
    if (!scheduled_messages.includes(msg.text))
      new_array.push({
        channel: msg.channel,
        text: msg.text,
        post_at: msg.post_at,
      });
  }

  return new_array;
};
