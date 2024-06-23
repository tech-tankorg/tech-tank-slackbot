import app from "../../utils/config/slack-config.ts";
import { generate_newsletter_post } from "../../utils/helpers/misc/generate-newsletter.ts";

import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { channels } from "../../utils/config/channel-config.ts";

export const post_newsletter = async (): Promise<void> => {
  try {
    const newsletter = await generate_newsletter_post();
    const message = await app.client.chat.postMessage({
      channel: channels.general,
      blocks: newsletter,
    });

    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      {
        newsletter_general_channel: {
          app_id: message.app_id,
          channel_id: message.channel,
          channel_ok: message.ok,
          text: message.text,
        },
      },
    ]);
  } catch (error) {
    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      { error_newsletter_general_channel: error },
    ]);
  }
};
