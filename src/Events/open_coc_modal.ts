import app from "../../utils/config/slack-config.ts";
import { coc_view_modal } from "../../utils/constants/consts.ts";
// import type { InteractiveMessage } from "@slack/bolt";

// type ff = Pick<SlackAction,"">

export const open_coc_modal = () => {
  app.action("open_coc_modal", async ({ ack, body, client }) => {
    await ack();
    const pre_body = body as any;

    await client.views.open({
      trigger_id: pre_body.trigger_id,
      view: coc_view_modal,
    });
  });
};
