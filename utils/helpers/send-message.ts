import app from "../config/slack-config.ts";
import type { Block } from "@slack/bolt";
import type { chat_response } from "../types/projectTypes.ts";

interface MSG {
  type: "msg";
  message: string;
}

interface BLOCKS {
  type: "blocks";
  blocks: Block[];
}

interface Args {
  user_id: string;
  input: MSG | BLOCKS;
}

export const send_message = async (msg_user: Args) => {
  const channel = await app.client.conversations.open({
    users: msg_user.user_id,
  });

  let msg: chat_response;

  if (msg_user.input.type === "msg") {
    msg = await app.client.chat.postMessage({
      channel: channel.channel?.id ?? "",
      text: msg_user.input.message,
    });
  } else {
    msg = await app.client.chat.postMessage({
      channel: channel.channel?.id ?? "",
      blocks: msg_user.input.blocks,
    });
  }

  return msg;
};

export const send_ephemeral_message = async (
  channel: string,
  user_id: string,
  msg: string
) => {
  await app.client.chat.postEphemeral({
    channel,
    user: user_id,
    text: msg,
  });
};
