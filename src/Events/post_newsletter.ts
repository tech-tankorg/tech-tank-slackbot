import app from "../../utils/config/slack-config.ts";
import { generate_newsletter } from "../../utils/helpers/generate-newsletter.ts";

import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { channels } from "../../utils/config/channel-config.ts";

export const post_newsletter = async () => {
  try {
    const newsletter = (await generate_newsletter()).blocks;
    const message = await app.client.chat.postMessage({
      channel: channels.general,
      blocks: newsletter,
    });

    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      { newsletter_general_channel: message },
    ]);
  } catch (error) {
    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      { error_newsletter_general_channel: error },
    ]);
  }
};