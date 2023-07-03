import type { ScheduledMessageResponse } from "../types/projectTypes.d.ts";
export const flatten_object = (obj: Record<string, string[]>) => {
  const values = Object.values(obj);

  const new_array: string[] = [];

  values.forEach((value) => {
    new_array.push(...value);
  });

  return new_array;
};

export const flatten_all_scheduled_messages_reponse = (
  obj: ScheduledMessageResponse[]
) => {
  const new_array: Array<string | undefined> = [];

  obj.forEach((value) => {
    new_array.push(value.text);
  });

  return new_array;
};

export const flatten_all_scheduled_messages_reponse_for_delete = (
  obj: ScheduledMessageResponse[]
) => {
  const new_array: Array<{
    msg_id: string | undefined;
    channel: string | undefined;
  }> = [];

  obj.forEach((value) => {
    new_array.push({ msg_id: value.id, channel: value.channel_id });
  });

  return new_array;
};
