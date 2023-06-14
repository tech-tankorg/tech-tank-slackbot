import dotenv from "dotenv";
import pkg from "@slack/bolt";
dotenv.config();

const { SLACK_BOT_TOKEN, SLACK_BOT_SIGNING_SECRET } = process.env;

if (!SLACK_BOT_TOKEN || !SLACK_BOT_SIGNING_SECRET)
  throw new Error("Missing variables");

const { App } = pkg;

// Initializes your app with your bot token and signing secret
const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_BOT_SIGNING_SECRET,
  socketMode: true, // add this
  appToken: process.env.SLACK_APP_TOKEN, // add this
  port: Number(process.env.PORT) || 3000,
});

export default app;
