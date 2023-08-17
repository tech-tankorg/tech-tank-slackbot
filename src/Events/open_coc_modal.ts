import app from "../../utils/config/slack-config.ts";
import { coc_view_modal } from "../../utils/constants/consts.ts";

export const open_coc_modal = () => {
  app.action("open_coc_modal", async ({ ack, body, client }) => {
    await ack();
    const id = body.user.id;
    await client.views.open({
      trigger_id: id,
      view: coc_view_modal,
    });
  });
};
