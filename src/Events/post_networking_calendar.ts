import app from "../../utils/config/slack-config.ts";
import { generate_newsletter_post } from "../../utils/helpers/generate-newsletter.ts";

import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { channels } from "../../utils/config/channel-config.ts";

export const post_newsletter = async (): Promise<void> => {
  try {
    const newsletter = await generate_newsletter_post();

    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      {
        networking_calendar_post: {},
      },
    ]);
  } catch (error) {
    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      { error_networking_calendar_post: error },
    ]);
  }
};
