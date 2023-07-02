import app from "../config/slack-config.ts";

(async () => {
  try {
    const scheduled_messages = await app.client.chat.scheduledMessages.list();

    console.log(scheduled_messages);
  } catch (error) {
    console.log(error);
  }
})();
