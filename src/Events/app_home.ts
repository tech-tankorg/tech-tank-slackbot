import app from "../../utils/config/slack-config.ts";
import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { generate_newsletter } from "../../utils/helpers/generate-newsletter.ts";

import type { app_home_view_response } from "../../utils/types/projectTypes.ts";
import { is_admin } from "../../utils/helpers/feat-flag.ts";

export const app_home_opened = () => {
  app.event("app_home_opened", async ({ payload, client }) => {
    let published_view: app_home_view_response;
    const userId = payload.user;

    try {
      if (is_admin(userId)) {
        const newsletter = (await generate_newsletter()).blocks;
        published_view = await client.views.publish({
          user_id: userId,
          view: {
            // Home tabs must be enabled in your app configuration page under "App Home"
            type: "home",
            blocks: newsletter,
          },
        });
      } else {
        published_view = await client.views.publish({
          user_id: userId,
          view: {
            // Home tabs must be enabled in your app configuration page under "App Home"
            type: "home",
            blocks: [
              {
                type: "header",
                text: {
                  type: "plain_text",
                  text: "Under construction",
                },
              },
            ],
          },
        });
      }

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        { app_home_opened: published_view },
      ]);
    } catch (error) {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        { app_home_opened_error: error },
      ]);
    }
  });
};
