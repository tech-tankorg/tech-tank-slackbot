// import app from "@utils/config/slack-config";
import app from "../utils/config/slack-config.ts";
// import { greet_new_team_member } from "./Events/greetings";

app.event("team_join", async ({ event, client, logger }) => {
  try {
    // Call chat.postMessage with the built-in client

    const userId = event.user.id;
    const userInfo = await client.users.info({
      user: userId,
    });

    const messages = `Welcome to the team ${userInfo.user?.real_name}`;

    // Open a direct message channel with the user
    const channel = await client.conversations.open({
      users: userId,
    });

    console.log(userInfo.user?.real_name);

    // Send the private message
    await client.chat.postMessage({
      channel: channel.channel?.id || "",
      text: messages,
      mrkdwn: true,
    });
  } catch (error) {
    logger.error(error);
  }
});

app.event("channel_rename", async ({ event, client }) => {
  const channel_id = event.channel.id;
  const message = "Channel was renamed! \n **this is bold text**";

  await client.chat.postMessage({
    channel: channel_id,
    text: message,
    mrkdwn: true,
  });
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
