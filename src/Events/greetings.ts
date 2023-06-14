// import app from "@utils/config/slack-config";
// import { generate_welcome_message } from "@utils/helpers/generate_message";

import app from "../../utils/config/slack-config.ts";
import { generate_welcome_message } from "../../utils/helpers/generate_message.ts";

export const greet_new_team_member = () => {
  app.event("team_join", async ({ event, client, logger }) => {
    try {
      // Call chat.postMessage with the built-in client

      const userId = event.user.id;
      const userInfo = await client.users.info({
        user: userId,
      });

      console.log(userInfo.user?.real_name);

      // Open a direct message channel with the user
      const channel = await client.conversations.open({
        users: userId,
      });

      const message = generate_welcome_message(userInfo.user?.real_name || "");

      // Send the private message
      await client.chat.postMessage({
        channel: channel.channel?.id || "",
        text: message,
      });
    } catch (error) {
      logger.error(error);
    }
  });
};
