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
          channel: channel.channel?.id ?? "",
          blocks: message.blocks,
        });

        return sent_message;
      }
    })
  );
};
