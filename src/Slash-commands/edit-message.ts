import app from "../../utils/config/slack-config.ts";
import {
  edit_message_modal,
  show_message_for_user,
} from "../../utils/constants/edit-message-modal.ts";

export const edit_message_command = () => {
  app.command("/edit-message", async ({ ack, body, client }) => {
    await ack();
    const trigger_id = body.trigger_id;
    const user_id = body.user_id;
    await client.views.open({
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

    await client.views.open({
      view: show_message_for_user(user_msg_history || []),
      trigger_id: bdy.trigger_id,
    });
  });
};

export const handle_view_message_submit = () => {
  app.view("edit-message-select-modal", async ({ ack, view, client }) => {
    await ack();

    const view_values = view.state.values;
    const msg_timestamp = view_values["select-timestamp-block"]
      ? view_values["select-timestamp-block"]["static-select-action"]
          ?.selected_option?.value
      : undefined;

    console.log(msg_timestamp);
  });
};
