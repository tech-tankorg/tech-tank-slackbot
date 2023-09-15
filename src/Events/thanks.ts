import app from "../../utils/config/slack-config.ts";
import { THANKS_CHANNEL_REGEX } from "../../utils/constants/consts.ts";

import {
  shoutout_message_user_text_validation,
  shoutout_message_channel_validation,
} from "../../utils/types/zod-types.ts";

export const thanks = async () => {
  app.message(THANKS_CHANNEL_REGEX, async ({ client, message }) => {
    const msg = message as any;
    const user_text = msg.text as string;
    const user_id_sender = msg.user as string;
    const channel_msg_sentin = msg.channel as string;

    try {
      // we can only send this message in the thanks channel so first check that
      const parsed_channel =
        shoutout_message_channel_validation.parse(channel_msg_sentin);

      const parsed_user_text =
        shoutout_message_user_text_validation.parse(user_text);

      console.log(parsed_channel, parsed_user_text);
    } catch {
      await client.chat.postEphemeral({
        channel: msg.channel as string,
        text: "The message needs to meet the following criteria: 1). It need to start with !thanks or !shoutout. 2). The message cannot contain multiple !thanks/!shoutouts",
        user: user_id_sender,
      });
    }
  });
};
