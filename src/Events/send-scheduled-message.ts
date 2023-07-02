import app from "../../utils/config/slack-config.ts";

import { generate_scheduled_messages } from "../../utils/helpers/generate-scheduled-messages.ts";
import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

export const send_scheduled_message = async (
  lst_msgs: string[],
  channel: string,
  date: string
) => {
  const message = generate_scheduled_messages(
    lst_msgs,
    channel,
    new Date(date)
  );

  try {
    const scheduled_messages = await Promise.all(
      message.map(async (item) => app.client.chat.scheduleMessage(item))
    );

    await Axiom.ingestEvents(AXIOM_DATA_SET, [{ scheduled_messages }]);
  } catch (error) {
    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      { error_scheduled_message: error },
    ]);
  }
};
