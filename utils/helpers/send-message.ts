import type { Block, KnownBlock } from "@slack/types";
import app from "../config/slack-config.ts";
import type { chat_response } from "../types/projectTypes.ts";

interface MSG {
  type: "msg";
  message: string;
}

interface BLOCKS {
  type: "blocks";
  blocks: Array<Block | KnownBlock>;
}

interface Args {
  id: string;
  input: MSG | BLOCKS;
  group: "user" | "channel";
}

export const send_message = async (msg_user: Args) => {
  const channel = await app.client.conversations.open(
    msg_user.group === "user"
      ? {
          users: msg_user.id,
        }
      : {
          channel: msg_user.id,
        }
  );

  let msg: chat_response;

  if (msg_user.input.type === "msg") {
    msg = await app.client.chat.postMessage({
      channel: channel.channel?.id ?? "",
      text: msg_user.input.message,
    });
  } else {
    msg = await app.client.chat.postMessage({
      text: "test",
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

export const dm_lst_of_people = async (
  lst_of_user_id: string[],
  message: MSG | BLOCKS,
  additional_persons: string | string[] | null
) => {
  const additional_persons_formatted = Array.isArray(additional_persons)
    ? additional_persons.join(",")
    : additional_persons;
  return await Promise.allSettled(
    lst_of_user_id.map(async (id) => {
      const users =
        additional_persons_formatted !== null
          ? `${id},${additional_persons_formatted}`
          : `${id}`;
      const channel = await app.client.conversations.open({
        users,
      });

      let sent_message: chat_response;

      if (message.type === "msg") {
        sent_message = await app.client.chat.postMessage({
          channel: channel.channel?.id ?? "",
          text: message.message,
        });
      } else {
        sent_message = await app.client.chat.postMessage({
          text: "test",
          channel: channel.channel?.id ?? "",
          blocks: message.blocks,
        });

        return sent_message;
      }
    })
  );
};
