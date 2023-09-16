import app from "../../utils/config/slack-config.ts";
import {
  THANKS_CHANNEL_REGEX,
  THANKS_CHANNEL_MESSAGE_SEPARATOR,
} from "../../utils/constants/consts.ts";

import {
  shoutout_message_user_text_validation,
  shoutout_message_channel_validation,
} from "../../utils/types/zod-types.ts";

import {
  get_recipients,
  remove_chars,
} from "../../utils/helpers/thanks-helpers.ts";

import { generate_thanks_message } from "../../utils/helpers/generate_message.ts";

import {
  create_thanks,
  get_thanks,
} from "../../utils/controllers/thanks-controller.ts";

export const thanks = async () => {
  app.message(THANKS_CHANNEL_REGEX, async ({ client, message }) => {
    const msg = message as any;
    const user_id_sender = msg.user as string;

    try {
      // we can only send this message in the thanks channel so first check that
      shoutout_message_channel_validation.parse(msg.channel);

      const parsed_user_text = shoutout_message_user_text_validation.parse(
        msg.text
      );

      const recipients_tags = get_recipients(parsed_user_text);
      const msg_text = remove_chars(
        parsed_user_text,
        THANKS_CHANNEL_MESSAGE_SEPARATOR
      );
      const recipients = remove_chars(
        recipients_tags[0] ?? "",
        THANKS_CHANNEL_REGEX
      );

      const user_id_receiver_array = recipients
        .split(/[\s,]/)
        .filter((item) => item !== "")
        .map((item) => {
          const formated_item = remove_chars(item, /(<|@|>)/g);
          return formated_item;
        });

      await Promise.all(
        user_id_receiver_array.map(async (user_id_receiver) => {
          void create_thanks(user_id_receiver, user_id_sender, msg_text);
        })
      );
    } catch {
      await client.chat.postEphemeral({
        channel: msg.channel as string,
        text: "The message needs to meet the following criteria: 1). It need to start with !thanks or !shoutout. 2). The message cannot contain multiple !thanks/!shoutouts",
        user: user_id_sender,
      });
    }
  });
};

export const post_thanks_message = async () => {
  try {
    const thanks = await get_thanks();

    const user_ids = Object.keys(thanks);

    await Promise.all(
      user_ids.map(async (user) => {
        // Open a direct message channel with the user
        const channel = await app.client.conversations.open({
          users: user,
        });

        const message = generate_thanks_message(thanks[user] ?? [], user);

        // Send the private message
        const thanks_message_sent = await app.client.chat.postMessage({
          channel: channel.channel?.id ?? "",
          text: message,
        });

        return thanks_message_sent;
      })
    );
  } catch (e) {
    console.error(e);
  }
};
