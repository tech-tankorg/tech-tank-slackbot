// import app from "@utils/config/slack-config";
// import { greet_new_team_member } from "./Events/greetings";

import dotenv from "dotenv";
import pkg from "@slack/bolt";
dotenv.config();

const { App } = pkg;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: Number(process.env.PORT) || 3000,
});

app.event("team_join", async ({ event, client, logger }) => {
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
      mrkdwn: true,
    });
  } catch (error) {
    logger.error(error);
  }
});

app.event("channel_rename", async ({ event, client }) => {
  const channel_id = event.channel.id;
  const message = "Channel was renamed!";

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
