// biome-ignore lint: msg type not properly defined by author thus the any type is used here
export const is_msg_in_thread = (msg: any) => {
  return Object.hasOwn(msg, "thread_ts");
};

export const generate_inclusive_message = (
  // biome-ignore lint: msg type not properly defined by author thus the any type is used here
  msg: any,
  text: string,
  user_id: string
) => {
  const is_in_thread = is_msg_in_thread(msg);
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
