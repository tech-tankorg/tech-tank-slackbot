// import app from "@utils/config/slack-config";
// import { generate_welcome_message } from "@utils/helpers/generate_message";

import Axiom from "../../utils/config/axiom-config.ts";
import app from "../../utils/config/slack-config.ts";
import { generate_welcome_message } from "../../utils/helpers/generate_message.ts";

import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { append_user_to_welcome_lst } from "../../utils/controllers/welcomes.ts";

export const greet_new_team_member = () => {
  app.event("team_join", async ({ event, client, logger }) => {
    try {
      // Call chat.postMessage with the built-in client

      const userId = event.user.id;
      const userInfo = await client.users.info({
        user: userId,
      });

      // Open a direct message channel with the user
      const channel = await client.conversations.open({
        users: userId,
      });

      const message = generate_welcome_message();

      // Send the private message
      const welcome_message_sent = await client.chat.postMessage({
        channel: channel.channel?.id ?? "",
        text: message,
      });

      await append_user_to_welcome_lst(userId);

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          welcome_user: {
            id: userInfo.user?.id,
            name: userInfo.user?.name,
            f_name: userInfo.user?.profile?.first_name,
            l_name: userInfo.user?.profile?.last_name,
            normalize_name: userInfo.user?.profile?.real_name_normalized,
            time_zone: userInfo.user?.tz,
            time_zone_label: userInfo.user?.tz_label,
            greeting_message_channel: welcome_message_sent.channel,
            greeting_message_user: welcome_message_sent.message?.user,
            greeting_message_bot_id: welcome_message_sent.message?.bot_id,
            greeting_message_message: welcome_message_sent.message?.text,
            greeting_message_ok: welcome_message_sent.ok,
          },
        },
      ]);
    } catch (error) {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        { greeting_message_error: error },
      ]);
    }
  });
};
