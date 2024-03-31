import { channels } from "../config/channel-config.ts";
import { international_timezone_formatter } from "../helpers/custom-date-fns.ts";
import type { messageElement } from "../types/projectTypes.ts";
export const edit_message_modal = (userID: string) => {
  return {
    type: "modal" as const,
    callback_id: "edit-message-modal",
    title: {
      type: "plain_text" as const,
      text: "Nemo Edit message",
      emoji: true,
    },
    submit: {
      type: "plain_text" as const,
      text: "Submit",
      emoji: true,
    },
    close: {
      type: "plain_text" as const,
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "actions",
        block_id: "conv_select-block",
        elements: [
          {
            type: "conversations_select",
            placeholder: {
              type: "plain_text" as const,
              text: "Select a conversation",
              emoji: true,
            },
            initial_conversation: channels.networking,
            action_id: "select-convo-action",
          },
          {
            type: "users_select",
            placeholder: {
              type: "plain_text" as const,
              text: "Select a user",
              emoji: true,
            },
            initial_user: userID,
            action_id: "select-user-action",
          },
        ],
      },
    ],
  };
};

export const show_message_for_user = (
  msgs: messageElement,
  private_metadata: string
) => {
  return {
    private_metadata,
    type: "modal" as const,
    title: {
      type: "plain_text" as const,
      text: "Nemo Edit Message",
      emoji: true,
    },
    callback_id: "edit-message-select-modal",
    submit: {
      type: "plain_text" as const,
      text: "Submit",
      emoji: true,
    },
    close: {
      type: "plain_text" as const,
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "input",
        block_id: "select-timestamp-block",
        element: {
          type: "static_select" as const,
          placeholder: {
            type: "plain_text" as const,
            text: "Select an item",
            emoji: true,
          },
          options: msgs.map((msg) => ({
            text: {
              type: "plain_text" as const,
              text: international_timezone_formatter(
                new Date(Number(msg.ts) * 1000)
              ),
              emoji: true,
            },
            value: msg.ts,
          })),
          action_id: "select-timestamp-action",
        },
        label: {
          type: "plain_text" as const,
          text: "Select the message time stamp",
          emoji: true,
        },
      },
    ],
  };
};

export const edit_message_tab = (
  private_metadata: string,
  previous_message: string
) => {
  return {
    private_metadata,
    type: "modal" as const,
    callback_id: "edit-message-tab-modal",
    title: {
      type: "plain_text" as const,
      text: "Nemo Edit Message",
      emoji: true,
    },
    submit: {
      type: "plain_text" as const,
      text: "Submit",
      emoji: true,
    },
    close: {
      type: "plain_text" as const,
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        block_id: "text-input-block",
        type: "input",
        element: {
          type: "plain_text_input",
          multiline: true,
          action_id: "text-input-action",
          initial_value: previous_message,
        },
        label: {
          type: "plain_text",
          text: "Type New message Below",
          emoji: true,
        },
      },
    ],
  };
};
