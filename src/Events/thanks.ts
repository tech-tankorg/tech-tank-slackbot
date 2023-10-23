import app from "../../utils/config/slack-config.ts";
import {
  THANKS_CHANNEL_REGEX,
  AXIOM_DATA_SET,
} from "../../utils/constants/consts.ts";
import Axiom from "../../utils/config/axiom-config.ts";

import {
  generate_user_id_receiver_array,
  sanitize_msg_lst,
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
      const final_lst = sanitize_msg_lst(msg.text);

      const final_messages_lst = final_lst.map((item) =>
        generate_user_id_receiver_array(item)
      );

      await Promise.all(
        final_messages_lst.map(async (user_sender) => {
          user_sender.user_id_receiver_array.forEach((item) => {
            void create_thanks(item, user_id_sender, user_sender.msg_text);
          });
        })
      );

      await client.chat.postEphemeral({
        channel: msg.channel as string,
        text: "We've saved your message!",
        user: user_id_sender,
      });
    } catch (e) {
      await client.chat.postEphemeral({
        channel: msg.channel as string,
        text: "An error has occurred. Please try again later! ",
        user: user_id_sender,
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [{ error_generate_thanks: e }]);
    }
  });
};

export const post_thanks_message = async () => {
  try {
    const thanks = await get_thanks();

    const user_ids = Object.keys(thanks);

    const sent_message_array = await Promise.all(
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
    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      { post_thanks_message: sent_message_array },
    ]);
  } catch (e) {
    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      { error_post_thanks_message: e },
    ]);
  }
};
