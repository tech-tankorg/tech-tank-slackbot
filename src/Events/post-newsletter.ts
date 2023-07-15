import app from "../../utils/config/slack-config.ts";

import { generate_newsletter } from "../../utils/helpers/generate-newsletter.ts";

export const post_newsletter = () => {
  app.message("newsletter", async ({ say }) => {
    const newsletter_post = await generate_newsletter();

    say({ ...newsletter_post });
  });
};
