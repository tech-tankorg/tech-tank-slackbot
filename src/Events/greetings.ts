import App from "@utils/config/slack-config";

export const greet_new_team_member = () => {
  App.event("team_join", async ({ event, client, logger }) => {
    try {
      // Call chat.postMessage with the built-in client

      const userId = event.user.id;
      const message = "Welcome to the team!";

      // Open a direct message channel with the user
      const channel = await client.conversations.open({
        users: userId,
      });

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
