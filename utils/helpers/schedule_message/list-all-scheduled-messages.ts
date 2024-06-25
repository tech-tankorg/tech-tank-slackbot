import app from "../../config/slack-config.ts";

import { sortArray } from "../general/sort-array.ts";

await (async () => {
  try {
    const scheduled_messages = await app.client.chat.scheduledMessages.list();

    sortArray(scheduled_messages.scheduled_messages ?? []);

    console.log(scheduled_messages);
  } catch (error) {
    console.log(error);
  }
})();
