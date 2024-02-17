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

export const coffee_chat_intro_message = (user_id: string) => {
  return [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: ":exclamation: Nemo coffee chat onboarding is incomplete",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: `Hi <@${user_id}>, please use "/coffee-chat-bio" to complete your onboarding to the coffee chat feature. Here you can complete your bio which will be used to introduce you. to other participants within the channel.`,
        emoji: true,
      },
    },
  ];
};

export const coffee_chat_shuffle_channel_msg = (date: string) => {
  return [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: ":tada: Hooray! I just shuffled everyone here just a few moments ago.",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: ":computer: Have fun meeting in your new groups :smile:",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: `:calendar: Your next scheduled shuffle is on ${date}.`,
        emoji: true,
      },
    },
  ];
};
