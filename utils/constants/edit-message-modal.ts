import { channels } from "../config/channel-config.ts";
import { messageElement } from "../types/projectTypes.ts";
import { international_timezone_formatter } from "../helpers/custom-date-fns.ts";
export const edit_message_modal = (userID: string) => {
  return {
    type: "modal" as const,
    callback_id: "edit-message-modal",
    title: {
      type: "plain_text" as const,
      text: "Edit message",
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
            initial_conversation: "C05BYP98MTR",
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
      {
        type: "section" as const,
        block_id: "view_messages",
        text: {
          type: "mrkdwn",
          text: "View messages from the channel by the user",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text" as const,
            text: "View message",
            emoji: true,
          },
          value: "view-messages",
          action_id: "view-message-action",
        },
      },
    ],
  };
};

export const show_message_for_user = (msgs: messageElement) => {
  return {
    type: "modal" as const,
    title: {
      type: "plain_text" as const,
      text: "My App",
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
        element: {
          type: "static_select" as const,
          placeholder: {
            type: "plain_text" as const,
            text: "Select an item",
            emoji: true,
          },
          options: msgs.map((msg) => {
            const unix_time = Number(msg.ts);

            const time = international_timezone_formatter(
              new Date(unix_time * 1000)
            );

            return {
              text: {
                type: "plain_text" as const,
                text: time,
                emoji: true,
              },
              value: msg.ts,
            };
          }),
          action_id: "static_select-action",
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
