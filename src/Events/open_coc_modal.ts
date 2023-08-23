import app from "../../utils/config/slack-config.ts";
import { coc_view_modal } from "../../utils/constants/consts.ts";
import { channels } from "../../utils/config/channel-config.ts";

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

export const accept_coc = () => {
  app.action("accept-coc", async ({ ack }) => {
    await ack();
  });
};

export const deny_coc = () => {
  app.action("deny-coc", async ({ ack, client, body }) => {
    await ack();
    const userID = body.user.id;

    await client.chat.postMessage({
      channel: channels.notification,
      text: `Hey <@channel>, <@${userID}> has declined the Tech Tank CoC. Let's connect with them to see how a resolution can be reached.`,
    });
  });
};
