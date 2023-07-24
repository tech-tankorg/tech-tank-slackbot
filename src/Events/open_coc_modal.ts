import app from "../../utils/config/slack-config.ts";
import { coc_view_modal } from "../../utils/constants/consts.ts";
import { v4 as uuid } from "uuid";

export const open_coc_modal = () => {
  const id = uuid();
  app.action(
    "open_coc_modal",
    async ({ ack, body, client, context, payload }) => {
      await ack();
      payload.type;
      await client.views.open({
        trigger_id: "132456.7890123.abcdef",
        view: coc_view_modal,
      });
    }
  );
};
