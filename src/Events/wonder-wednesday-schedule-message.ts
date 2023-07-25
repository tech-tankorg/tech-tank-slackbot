import app from "../../utils/config/slack-config.ts";
import type { day } from "../../utils/types/projectTypes.ts";

import { generate_scheduled_messages } from "../../utils/helpers/generate-scheduled-messages.ts";
import { prep_final_scheduled_message } from "../../utils/helpers/prep-final-scheduled-message.ts";

import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

export const wonder_wednesday_send_schedule_message = async (
  lst_msgs: string[],
  channel: string,
  date: string,
  repeat_day: day,
  frequency: number
) => {
  const generated_messages = generate_scheduled_messages(
    lst_msgs,
    channel,
    new Date(date),
    repeat_day,
    frequency
  );

  try {
    const all_scheduled_messages =
      await app.client.chat.scheduledMessages.list();

    const final_messages_to_schedule = prep_final_scheduled_message(
      all_scheduled_messages,
      generated_messages
    );

    const scheduled_messages_wonder_wednesday = await Promise.all(
      final_messages_to_schedule.map(async (item) => {
        return app.client.chat.scheduleMessage(item);
      })
    );

    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      { scheduled_messages_wonder_wednesday },
    ]);
  } catch (error) {
    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      { error_scheduled_messages_wonder_wednesday: error },
    ]);
  }
};
