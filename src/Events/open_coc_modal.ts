import { channels } from "../../utils/config/channel-config.ts";
import app from "../../utils/config/slack-config.ts";
import {
  coc_view_modal_with_ack_btns,
  coc_view_modal_without_ack_btns,
} from "../../utils/constants/coc-view-modal.ts";

import type { InteractiveMessage } from "@slack/bolt";
import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";
import {
  add_user_to_db,
  has_user_ack_coc,
} from "../../utils/controllers/users.ts";

import Sentry from "../../utils/config/sentry.config.ts";

const transaction = Sentry.startTransaction({
  op: "test-open-coc",
  name: "Transaction for COC",
});

let view_id: string | undefined = "";
export const open_coc_modal = () => {
  app.action("open_coc_modal", async ({ ack, body, client }) => {
    await ack();
    const pre_body = body as InteractiveMessage;

    try {
      const display_view_toggle = await has_user_ack_coc(body.user.id);

      const display_coc_view = display_view_toggle
        ? coc_view_modal_without_ack_btns
        : coc_view_modal_with_ack_btns;

      const view = await client.views.open({
        trigger_id: pre_body.trigger_id,
        view: display_coc_view,
      });

      view_id = view.view?.id;

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          coc_opened: {
            user_id: body.user.id,
            view_opened: view.ok,
            app_id: view.view?.app_id,
            bot_id: view.view?.bot_id,
            callback_id: view.view?.callback_id,
          },
        },
      ]);
    } catch (e) {
      view_id = "";
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        { coc_opened_error: { user: body.user.id, error: e } },
      ]);

      Sentry.captureException(e);
    } finally {
      transaction.finish();
    }
  });
  return view_id;
};

export const accept_coc = () => {
  app.action("accept-coc", async ({ ack, body, client }) => {
    await ack();

    try {
      const user_profile = await client.users.profile.get({
        user: body.user.id,
      });

      await add_user_to_db(
        user_profile.profile?.real_name_normalized ?? "",
        body.user.id,
        "accepted"
      );

      await client.views.update({
        view_id,
        view: coc_view_modal_without_ack_btns,
      });
    } catch (e) {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [{ error_accept_coc: e }]);
    }
  });
};

export const deny_coc = () => {
  app.action("deny-coc", async ({ ack, client, body }) => {
    await ack();
    const userID = body.user.id;

    try {
      const user_profile = await client.users.profile.get({
        user: body.user.id,
      });

      await add_user_to_db(
        user_profile.profile?.real_name_normalized ?? "",
        body.user.id,
        "denied"
      );

      await client.chat.postMessage({
        channel: channels.notification,
        text: `Hey <@channel>, <@${userID}> has declined the Tech Tank CoC. Let's connect with them to see how a resolution can be reached.`,
      });

      await client.views.update({
        view_id,
        view: coc_view_modal_without_ack_btns,
      });
    } catch (e) {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [{ error_deny_coc: e }]);
    }
  });
};
