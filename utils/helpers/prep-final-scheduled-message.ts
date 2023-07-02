import { flatten_all_scheduled_messages_reponse } from "./flatten-object.ts";
import { check_if_message_is_scheduled } from "./check-if-message-scheduled.ts";

import type { ChatScheduledMessagesListResponse } from "../types/projectTypes.d.ts";

export const prep_final_scheduled_message = (
  msg_lst: ChatScheduledMessagesListResponse,
  generated_messages: {
    channel: string;
    post_at: number;
    text: string;
  }[]
) => {
  const scheduled_message_array = msg_lst.scheduled_messages
    ? msg_lst.scheduled_messages
    : [];

  const flattened_all_schedule_messages =
    flatten_all_scheduled_messages_reponse(scheduled_message_array);

  const final_messages_to_schedule = check_if_message_is_scheduled(
    generated_messages,
    flattened_all_schedule_messages
  );

  return final_messages_to_schedule;
};
