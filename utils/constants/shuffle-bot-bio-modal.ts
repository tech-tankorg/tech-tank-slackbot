export const shuffle_bot_bio_modal = {
  type: "modal" as const,
  callback_id: "coffee-chat-bio-modal",
  title: {
    type: "plain_text" as const,
    text: "Edit your Nemo Bio",
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
      type: "section",
      text: {
        type: "plain_text" as const,
        text: "Hey [user]! Let's get started!",
        emoji: true,
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "plain_text" as const,
        text: "Complete your bio below, which will be shared with your next coffee chat group!",
        emoji: true,
      },
    },
    {
      type: "input",
      block_id: "pronouns-action-block",
      element: {
        type: "static_select",
        placeholder: {
          type: "plain_text" as const,
          text: "Select an item",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text" as const,
              text: "*this is plain_text text*",
              emoji: true,
            },
            value: "value-0",
          },
          {
            text: {
              type: "plain_text" as const,
              text: "*this is plain_text text*",
              emoji: true,
            },
            value: "value-1",
          },
          {
            text: {
              type: "plain_text" as const,
              text: "*this is plain_text text*",
              emoji: true,
            },
            value: "value-2",
          },
        ],
        action_id: "pronouns-action",
      },
      label: {
        type: "plain_text" as const,
        text: ":speech_balloon: Pronouns",
        emoji: true,
      },
    },
    {
      type: "input",
      block_id: "title-action-block",
      element: {
        type: "static_select",
        placeholder: {
          type: "plain_text" as const,
          text: "Select an item",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text" as const,
              text: "*this is plain_text text*",
              emoji: true,
            },
            value: "value-0",
          },
          {
            text: {
              type: "plain_text" as const,
              text: "*this is plain_text text*",
              emoji: true,
            },
            value: "value-1",
          },
          {
            text: {
              type: "plain_text" as const,
              text: "*this is plain_text text*",
              emoji: true,
            },
            value: "value-2",
          },
        ],
        action_id: "title-action",
      },
      label: {
        type: "plain_text" as const,
        text: ":computer: Title",
        emoji: true,
      },
    },
    {
      type: "input",
      block_id: "location-action-block",
      element: {
        type: "static_select",
        placeholder: {
          type: "plain_text" as const,
          text: "Select an item",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text" as const,
              text: "*this is plain_text text*",
              emoji: true,
            },
            value: "value-0",
          },
          {
            text: {
              type: "plain_text" as const,
              text: "*this is plain_text text*",
              emoji: true,
            },
            value: "value-1",
          },
          {
            text: {
              type: "plain_text" as const,
              text: "*this is plain_text text*",
              emoji: true,
            },
            value: "value-2",
          },
        ],
        action_id: "location-action",
      },
      label: {
        type: "plain_text" as const,
        text: ":round_pushpin: Location",
        emoji: true,
      },
    },
    {
      type: "input",
      block_id: "intro-action-block",
      element: {
        type: "plain_text_input",
        multiline: true,
        action_id: "intro-action",
      },
      label: {
        type: "plain_text" as const,
        text: ":wave: Short Intro",
        emoji: true,
      },
    },
  ],
};
