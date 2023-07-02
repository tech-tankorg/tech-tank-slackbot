import app from "../../utils/config/slack-config.ts";

import { generate_scheduled_messages } from "../../utils/helpers/generate-scheduled-messages.ts";
import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { flatten_all_scheduled_messages_reponse } from "../../utils/helpers/flatten-object.ts";

import { check_if_message_is_scheduled } from "../../utils/helpers/check-if-message-scheduled.ts";

export const send_scheduled_message = async (
  lst_msgs: string[],
  channel: string,
  date: string
) => {
  const generated_messages = generate_scheduled_messages(
    lst_msgs,
    channel,
    new Date(date)
  );

  try {
    const all_scheduled_messages =
      await app.client.chat.scheduledMessages.list();

    const scheduled_message_array = all_scheduled_messages.scheduled_messages
      ? all_scheduled_messages.scheduled_messages
      : [];

    const flattened_all_schedule_messages =
      flatten_all_scheduled_messages_reponse(scheduled_message_array);

    const final_messages_to_schedule = check_if_message_is_scheduled(
      generated_messages,
      flattened_all_schedule_messages
    );

    const scheduled_messages = await Promise.all(
      final_messages_to_schedule.map(async (item) => {
        return app.client.chat.scheduleMessage(item);
      })
    );

    await Axiom.ingestEvents(AXIOM_DATA_SET, [{ scheduled_messages }]);
  } catch (error) {
    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      { error_scheduled_message: error },
    ]);
  }
};
