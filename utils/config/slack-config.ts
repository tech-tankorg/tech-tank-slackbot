import { config } from "dotenv";
import pkg from "@slack/bolt";

config();
const { App } = pkg;

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: Number(process.env.DB_PORT) ?? 5001,
});

export default app;
