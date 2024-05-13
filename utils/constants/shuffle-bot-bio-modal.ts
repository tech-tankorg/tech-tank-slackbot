import type { shuffle_bot_user_type } from "../types/projectTypes.ts";
import type { View } from "@slack/types";

interface Initials {
  pronouns: string;
  title: string;
  location: string;
  intro: string;
}
export const shuffle_bot_bio_modal = (
  user_id: string,
  initValues: Initials
): View => {
  return {
    type: "modal" as const,
    callback_id: "coffee-chat-bio-modal",
    title: {
      type: "plain_text" as const,
      text: "Edit Coffee chat bio",
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
          text: `Hey <@${user_id}>! Let's get started!`,
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
          type: "plain_text_input",
          multiline: true,
          action_id: "pronouns-action",
          initial_value: initValues.pronouns,
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
          type: "plain_text_input",
          multiline: true,
          action_id: "title-action",
          initial_value: initValues.title,
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
          type: "plain_text_input",
          multiline: true,
          action_id: "location-action",
          initial_value: initValues.location,
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
          max_length: 200,
          action_id: "intro-action",
          initial_value: initValues.intro,
        },
        label: {
          type: "plain_text" as const,
          text: ":wave: Short Intro",
          emoji: true,
        },
      },
    ],
  };
};

export const coffee_chat_intro_message = (user: string) => {
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
        text: `Hi ${user}! Please use "/coffee-chat-bio" to complete your onboarding to the coffee chat feature. Here you can complete your bio which will be used to introduce you to other participants within the channel.`,
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

export const shuffle_user_group_intro_msg = (
  profile: shuffle_bot_user_type
) => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:wave: Everyone, meet <@${profile.user_id}> (${
          profile.bio.pronouns ?? "placeholder"
        }):`,
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: profile.bio.intro !== "" ? profile.bio.intro : "placeholder",
      },
      fields: [
        {
          type: "plain_text",
          text: `:computer: ${profile.bio.title ?? "placeholder"}`,
          emoji: true,
        },
        {
          type: "plain_text",
          text: `:round_pushpin: ${profile.bio.location ?? "placeholder"}`,
          emoji: true,
        },
      ],
      accessory: {
        type: "image",
        image_url:
          profile.bio.img_url ??
          "https://secure.gravatar.com/avatar/a506b0a0e7aef90663c21253c8b3f900.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0005-512.png",
        alt_text: "Profile picture",
      },
    },
  ];
};
