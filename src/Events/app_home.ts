import app from "../../utils/config/slack-config.ts";
import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { generate_newsletter } from "../../utils/helpers/generate-newsletter.ts";

import { is_admin } from "../../utils/helpers/feat-flag.ts";

export const app_home_opened = () => {
  app.event("app_home_opened", async ({ payload, client }) => {
    const userId = payload.user;

    const view_to_show = is_admin(userId)
      ? (await generate_newsletter()).blocks
      : [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: ":construction: Under construction :construction:",
            },
          },
        ];

    try {
      const published_view = await client.views.publish({
        user_id: userId,
        view: {
          // Home tabs must be enabled in your app configuration page under "App Home"
          type: "home",
          blocks: view_to_show,
        },
      });

      Axiom.ingest(AXIOM_DATA_SET, [{ app_home_opened: published_view }]);
    } catch (error) {
      Axiom.ingest(AXIOM_DATA_SET, [{ app_home_opened_error: error }]);
    }
  });
};
