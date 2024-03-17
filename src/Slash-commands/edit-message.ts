import app from "../../utils/config/slack-config.ts";
import {
  edit_message_modal,
  show_message_for_user,
  edit_message_tab,
} from "../../utils/constants/edit-message-modal.ts";

import type { ViewOpenResponse } from "../../utils/types/projectTypes.ts";

let handle_message_submit_open_views: ViewOpenResponse;
let handle_view_message_submit_open_views: ViewOpenResponse;

export const edit_message_command = () => {
  app.command("/edit-message", async ({ ack, body, client }) => {
    await ack();
    const trigger_id = body.trigger_id;
    const user_id = body.user_id;
    const open_view = await client.views.open({
      trigger_id,
      view: edit_message_modal(user_id),
    });
  });
};

export const handle_edit_message_submit = () => {
  app.view("edit-message-modal", async ({ ack, view, client, body }) => {
    await ack();

    // biome-ignore lint: incorrect typescript types therefore "any" is here
    const bdy = body as any;

    const view_values = view.state.values;
    const convo_select = view_values["conv_select-block"]
      ? view_values["conv_select-block"]["select-convo-action"]
          ?.selected_conversation
      : undefined;

    const user_select = view_values["conv_select-block"]
      ? view_values["conv_select-block"]["select-user-action"]?.selected_user
      : undefined;

    const history_msg = await client.conversations.history({
      channel: convo_select ?? "",
    });

    const user_msg_history = history_msg.messages?.filter(
      (msg) => msg.user === user_select
    );

    handle_message_submit_open_views = await client.views.open({
      view: show_message_for_user(user_msg_history ?? [], convo_select ?? ""),
      trigger_id: bdy.trigger_id,
    });
  });
};

export const handle_view_message_submit = () => {
  app.view("edit-message-select-modal", async ({ ack, view, client, body }) => {
    await ack();

    // biome-ignore lint: incorrect typescript types therefore "any" is here
    const bdy = body as any;

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

    //biome-ignore lint: The below syntax is easier to read
    const previous_msg = (user_msg_history && user_msg_history[0]?.text) || "";

    handle_view_message_submit_open_views = await client.views.open({
      view: edit_message_tab(msg_timestamp ?? "", previous_msg),
      trigger_id: bdy.trigger_id,
    });
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
