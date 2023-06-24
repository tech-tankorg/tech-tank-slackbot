// import app from "@utils/config/slack-config";
// import { generate_welcome_message } from "@utils/helpers/generate_message";

import app from "../../utils/config/slack-config.ts";
import { generate_welcome_message } from "../../utils/helpers/generate_message.ts";
import Axiom from "../../utils/config/axiom-config.ts";

import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

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

      const message = generate_welcome_message(userInfo.user?.real_name || "");

      // Send the private message
      const welcome_message_sent = await client.chat.postMessage({
        channel: channel.channel?.id || "",
        text: message,
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        { greeting_message: welcome_message_sent },
        { user_info: userInfo },
      ]);
    } catch (error) {
      logger.error(error);
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        { greeting_message_error: error },
      ]);
    }
  });
};
