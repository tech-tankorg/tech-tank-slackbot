import app from "../../utils/config/slack-config.ts";
import { THANKS_CHANNEL_REGEX } from "../../utils/constants/consts.ts";

export const thanks = () => {
  app.message(THANKS_CHANNEL_REGEX, async ({ message, client }) => {});
};
