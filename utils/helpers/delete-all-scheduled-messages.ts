import app from "../config/slack-config.ts";
import { flatten_all_scheduled_messages_reponse_for_delete } from "./flatten-object.ts";

await (async () => {
  try {
    const scheduled_messages = await app.client.chat.scheduledMessages.list();

    const scheduled_message_array = scheduled_messages.scheduled_messages ?? [];

    const delete_id_channel_lst =
      flatten_all_scheduled_messages_reponse_for_delete(
        scheduled_message_array
      );

    await Promise.all(
      delete_id_channel_lst.map(
        async (msg) =>
          await app.client.chat.deleteScheduledMessage({
            channel: msg.channel ?? "",
            scheduled_message_id: msg.msg_id ?? "",
          })
      )
    );
  } catch (error) {
    console.log(error);
  }
})();
