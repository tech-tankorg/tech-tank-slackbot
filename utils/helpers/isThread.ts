import { key_is_present } from "./obj-has-property.ts";
export const generate_inclusive_message = (
  // biome-ignore lint: msg type not properly defined by author thus the any type is used here
  msg: any,
  text: string,
  user_id: string
) => {
  const is_in_thread = key_is_present(msg, "thread_ts");
  if (is_in_thread) {
    return {
      channel: msg.channel as string,
      text,
      user: user_id,
      thread_ts: msg.thread_ts,
    };
  }

  return {
    channel: msg.channel as string,
    text,
    user: user_id,
  };
};
