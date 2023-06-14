// import app from "@utils/config/slack-config.ts";
import app from "../utils/config/slack-config.ts";
import { greet_new_team_member } from "./Events/greetings.ts";

greet_new_team_member();

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
