import app from "../../utils/config/slack-config.ts";
import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { generate_newsletter } from "../../utils/helpers/generate-newsletter.ts";
import Sentry from "../../utils/config/sentry.config.ts";

const transaction = Sentry.startTransaction({
  op: "app_home",
  name: "App home",
});

export const app_home_opened = () => {
  app.event("app_home_opened", async ({ payload, client }) => {
    const userId = payload.user;

    const view_to_show = await generate_newsletter();
    // console.log(view_to_show);

    try {
      const published_view = await client.views.publish({
        user_id: userId,
        view: {
          // Home tabs must be enabled in your app configuration page under "App Home"
          type: "home",
          blocks: view_to_show,
        },
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          app_home_opened: {
            userId,
            published_view_view: published_view.ok,
            published_view_app_id: published_view.view?.app_id,
            published_view_bot_id: published_view.view?.bot_id,
          },
        },
      ]);
    } catch (error) {
      Sentry.captureException(error);
      console.log(error);
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        { app_home_opened_error: { userId, error } },
      ]);
    } finally {
      transaction.finish();
    }
  });
};
