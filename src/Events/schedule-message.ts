import app from "../../utils/config/slack-config.ts";

import { generate_scheduled_messages } from "../../utils/helpers/generate-scheduled-messages.ts";
import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

export const schedule_message = async () => {
  const message = generate_scheduled_messages(
    [
      "Q:hello there",
      "Q:how is your day going?",
      "Does pineapple go on Pizza?",
    ],
    "C05BYP98MTR",
    new Date("July 12, 2023 00:00:00 UTC")
  );

  console.log(message);

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
