import app from "../../utils/config/slack-config.ts";
import {
  edit_message_modal,
  show_message_for_user,
  edit_message_tab,
} from "../../utils/constants/edit-message-modal.ts";
import { is_admin } from "../../utils/helpers/feat-flag.ts";

import { subDays } from "date-fns";

import type { ViewOpenResponse } from "../../utils/types/projectTypes.ts";

import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

let edit_message_view: ViewOpenResponse;
let handle_message_submit_open_views: ViewOpenResponse;
let handle_view_message_submit_open_views: ViewOpenResponse;

export const edit_message_command = () => {
  app.command("/edit-message", async ({ ack, body, client, respond }) => {
    await ack();
    const trigger_id = body.trigger_id;
    const user_id = body.user_id;
    const user_name = body.user_name;

    if (!is_admin(user_id)) {
      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: ":octagonal_sign: Sorry, only specific users are allowed to access this command!! :octagonal_sign:",
      });
      return;
    }

    try {
      edit_message_view = await client.views.open({
        trigger_id,
        view: edit_message_modal(user_id),
      });
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          edit_message_view: {
            user_id,
            user_name,
            status: edit_message_view.ok,
          },
        },
      ]);
    } catch {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_edit_message_view: {
            user_id,
            user_name,
            status: edit_message_view.ok,
          },
        },
      ]);
    }
  });
};

export const handle_edit_message_submit = () => {
  app.view("edit-message-modal", async ({ ack, view, client, body }) => {
    await ack();
    // biome-ignore lint: incorrect typescript types therefore "any" is here
    const bdy = body as any;
    const user_id = body.user.id;
    const user_name = body.user.name;

    try {
      const view_values = view.state.values;
      const convo_select = view_values["conv_select-block"]
        ? view_values["conv_select-block"]["select-convo-action"]
            ?.selected_conversation
        : undefined;

      const user_select = view_values["conv_select-block"]
        ? view_values["conv_select-block"]["select-user-action"]?.selected_user
        : undefined;

      const oldestTime = subDays(new Date(), 3);
      const unixTimestamp = Math.floor(oldestTime.getTime() / 1000);

      const history_msg = await client.conversations.history({
        channel: convo_select ?? "",
        oldest: String(unixTimestamp),
      });

      const user_msg_history = history_msg.messages?.filter(
        (msg) => msg.user === user_select
      );

      handle_message_submit_open_views = await client.views.open({
        view: show_message_for_user(user_msg_history ?? [], convo_select ?? ""),
        trigger_id: bdy.trigger_id,
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          handle_edit_message_submit: {
            user_id,
            user_name,
            status: handle_message_submit_open_views.ok,
          },
        },
      ]);
    } catch {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_handle_edit_message_submit: {
            user_id,
            user_name,
            status: handle_message_submit_open_views.ok,
            error: handle_message_submit_open_views.error,
          },
        },
      ]);
    }
  });
};

export const handle_view_message_submit = () => {
  app.view("edit-message-select-modal", async ({ ack, view, client, body }) => {
    await ack();

    // biome-ignore lint: incorrect typescript types therefore "any" is here
    const bdy = body as any;
    const user_id = body.user.id;
    const user_name = body.user.name;

    try {
      const view_values = view.state.values;
      const msg_timestamp = view_values["select-timestamp-block"]
        ? view_values["select-timestamp-block"]["select-timestamp-action"]
            ?.selected_option?.value
        : undefined;

      const channel = handle_message_submit_open_views.view?.private_metadata;

      const history_msg = await client.conversations.history({
        channel: channel ?? "",
      });

      const user_msg_history = history_msg.messages?.filter(
        (msg) => msg.ts === msg_timestamp
      );

      const previous_msg =
        //biome-ignore lint: The below syntax is easier to read
        (user_msg_history && user_msg_history[0]?.text) || "";

      handle_view_message_submit_open_views = await client.views.open({
        view: edit_message_tab(msg_timestamp ?? "", previous_msg),
        trigger_id: bdy.trigger_id,
      });
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          handle_view_message_submit: {
            user_id,
            user_name,
            status: handle_view_message_submit_open_views.ok,
          },
        },
      ]);
    } catch {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_handle_view_message_submit: {
            user_id,
            user_name,
            status: handle_view_message_submit_open_views.ok,
          },
        },
      ]);
    }
  });
};

export const handle_view_message_tab_submit = () => {
  app.view("edit-message-tab-modal", async ({ ack, view, client }) => {
    await ack();

    const view_values = view.state.values;
    const new_msg = view_values["text-input-block"]
      ? view_values["text-input-block"]["text-input-action"]?.value
      : undefined;

    const timestamp =
      handle_view_message_submit_open_views.view?.private_metadata;
    const channel = handle_message_submit_open_views.view?.private_metadata;

    await client.chat.update({
      channel: channel ?? "",
      ts: timestamp ?? "",
      text: new_msg ?? "",
    });
  });
};
