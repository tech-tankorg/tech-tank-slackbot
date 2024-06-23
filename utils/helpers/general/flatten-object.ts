import type { ScheduledMessageResponse } from "../../types/projectTypes.ts";

export const flatten_array = <T>(arr: T[][]) => {
  const new_array: T[] = [];

  for (const value of arr) {
    new_array.push(...value);
  }

  return new_array;
};

export const flatten_all_scheduled_messages_reponse = (
  obj: ScheduledMessageResponse[]
) => {
  const new_array: Array<string | undefined> = [];

  for (const value of obj) {
    new_array.push(value.text);
  }

  return new_array;
};

export const flatten_all_scheduled_messages_reponse_for_delete = (
  obj: ScheduledMessageResponse[]
) => {
  const new_array: Array<{
    msg_id: string | undefined;
    channel: string | undefined;
  }> = [];

  for (const value of obj) {
    new_array.push({ msg_id: value.id, channel: value.channel_id });
  }

  return new_array;
};
