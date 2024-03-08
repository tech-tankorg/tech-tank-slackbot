import app from "../../utils/config/slack-config.ts";
import { generate_network_calender } from "../../utils/helpers/generate_networking_calendar.ts";

import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { channels } from "../../utils/config/channel-config.ts";

export const post_networking_calendar = async (): Promise<void> => {
  try {
    const post = await generate_network_calender();

    const message = await app.client.chat.postMessage({
      text: post,
      channel: channels.networking,
    });

    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      {
        networking_calendar_post: {
          app_id: message.app_id,
          channel_id: message.channel,
          channel_ok: message.ok,
          text: message.text,
        },
      },
    ]);
  } catch (error) {
    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      { error_networking_calendar_post: error },
    ]);
  }
};
