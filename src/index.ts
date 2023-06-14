// import app from "@utils/config/slack-config";

import dotenv from "dotenv";
import pkg from "@slack/bolt";
dotenv.config();

const { App } = pkg;

// const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: Number(process.env.PORT) || 3000,
});

// Listens to incoming messages that contain "hello"
app.message("hello", async ({ message, say }: { message: any; say: any }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
