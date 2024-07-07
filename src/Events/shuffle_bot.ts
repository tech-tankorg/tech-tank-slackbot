import app from "../../utils/config/slack-config.ts";
import {
  create_shuffle_groups,
  update_next_shuffle_date,
} from "../../utils/controllers/shuffle-bot-groups.ts";
import {
  create_shuffle_bot_user,
  delete_shuffle_bot_user,
  get_all_active_shuffle_bot_users,
  get_shuffle_bot_user,
  update_shuffle_activity,
  update_shuffle_bot_bio,
} from "../../utils/controllers/shuffle-bot-users.ts";
import {
  determine_next_execute_date_freq,
  international_timezone_formatter,
} from "../../utils/helpers/date/custom-date-fns.ts";
import { send_message } from "../../utils/helpers/general/send-message.ts";
import {
  create_group_sendMsg,
  shuffle_users,
} from "../../utils/helpers/shuffle_bot/shuffle-bot-helpers.ts";

import {
  coffee_chat_intro_message,
  coffee_chat_shuffle_channel_msg,
  shuffle_bot_bio_modal,
} from "../../utils/constants/shuffle-bot-bio-modal.ts";

import {
  channels,
  coffee_chat_config,
} from "../../utils/config/channel-config.ts";

import Axiom from "../../utils/config/axiom-config.ts";
import {
  AXIOM_DATA_SET,
  SHUFFLE_SETTINGS_ID,
} from "../../utils/constants/consts.ts";

/**
 * Creates a brand new shuffle for users
 *
 * Gets all active users and filters for just the ID's.
 * Shuffles users into groups of a specified size and then creates a private chat with all appropriate members
 * */

export const coffee_chat_bot_shuffle = async () => {
  const all_active_users = await get_all_active_shuffle_bot_users();
  const all_active_users_ids = all_active_users.map((user) => user.user_id);

  const today = new Date();
  today.setHours(14, 0);

  const next_shuffle_date = determine_next_execute_date_freq(
    today,
    "monday",
    coffee_chat_config.shuffle_frequency
  );
  const next_shuffle_date_formatted =
    international_timezone_formatter(next_shuffle_date);

  const shuffled_new_users = shuffle_users(
    all_active_users_ids,
    coffee_chat_config.users_per_group
  );

  try {
    await create_shuffle_groups(shuffled_new_users);
    await update_next_shuffle_date(SHUFFLE_SETTINGS_ID, next_shuffle_date);

    await create_group_sendMsg(shuffled_new_users, all_active_users);

    // post message in the channel that new groups have been made

    await app.client.chat.postMessage({
      channel: channels.coffee_chat,
      text: "Members have been shuffled!!",
      blocks: coffee_chat_shuffle_channel_msg(next_shuffle_date_formatted),
    });

    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      {
        coffee_chat_bot: {
          status: "Coffee chat bot shuffle complete",
        },
      },
    ]);
  } catch {
    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      {
        coffee_chat_bot: {
          status: "Coffee chat bot shuffle incomplete",
        },
      },
    ]);
  }
};

export const coffee_chat_bot_joined_channel = (allow_channels: Set<string>) => {
  app.event("member_joined_channel", async ({ event, client }) => {
    if (!allow_channels.has(event.channel)) return;

    // When a member joins the channel they should be added to the shuffle list
    // The newly joined member should also receive a message telling them to fill out their bio

    try {
      const userInfo = await client.users.info({ user: event.user });
      const user_name = userInfo.user?.profile?.display_name_normalized ?? "";
      const user_profile_image = userInfo.user?.profile?.image_512 ?? "";

      await create_shuffle_bot_user(event.user, user_name, user_profile_image);

      const sent_message = await send_message({
        id: event.user,
        text: "Nemo coffee chat onboarding is incomplete",
        input: {
          type: "blocks",
          blocks: coffee_chat_intro_message(user_name),
        },
        group: "user",
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          coffee_chat_bot: {
            channel: event.channel,
            user_id: event.user,
            user_name,
            sent_message: sent_message.ok,
            status: "Added to channel",
          },
        },
      ]);
    } catch (error) {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_coffee_chat_bot: {
            channel: event.channel,
            user_id: event.user,

            status: "Failed to add",
            error,
          },
        },
      ]);
    }
  });
};

export const coffee_chat_bot_left_channel = (allow_channels: Set<string>) => {
  app.event("member_left_channel", async ({ event }) => {
    if (!allow_channels.has(event.channel)) return;

    // When a member leaves the channel they should be removed to the shuffle list
    try {
      await delete_shuffle_bot_user(event.user);
      const sent_message = await send_message({
        id: event.user,
        text: `You've been removed from the following coffee chat channel: <#${event.channel}>`,
        input: {
          type: "msg",
          message: `You've been removed from the following coffee chat channel: <#${event.channel}>`,
        },
        group: "user",
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          coffee_chat_bot: {
            channel: event.channel,
            user_id: event.user,
            sent_message: sent_message.ok,
            status: "Removed to channel",
          },
        },
      ]);
    } catch {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_coffee_chat_bot: {
            channel: event.channel,
            user_id: event.user,

            status: "Failed to remove",
          },
        },
      ]);
    }
  });
};

export const coffee_chat_user_deactivate = () => {
  app.command("/coffee-deactivate", async ({ ack, body, respond }) => {
    await ack();
    const user_id = body.user_id;
    const channel = body.channel_id;

    try {
      await update_shuffle_activity(user_id, false);
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          coffee_chat_bot: {
            channel: body.channel_id,
            user_id,
            status: "User deactivated",
          },
        },
      ]);

      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: `Your coffee chat activity in the following channel (<#${channel}>) has been deactivated. You will not appear within the next rotation.`,
      });
    } catch {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_coffee_chat_bot: {
            channel: body.channel_id,
            user_id,
            status: "Failed to deactivate",
          },
        },
      ]);
      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: "Failed to deactivate your coffee chat activity. You will still appear within the next rotation. ",
      });
    }
  });
};

export const coffee_chat_user_activate = () => {
  app.command("/coffee-activate", async ({ ack, body, respond }) => {
    await ack();
    const user_id = body.user_id;
    const channel = body.channel_id;

    try {
      await update_shuffle_activity(user_id, true);
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          coffee_chat_bot: {
            channel: body.channel_id,
            user_id,
            status: "User activated",
          },
        },
      ]);

      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: `Your coffee chat activity in the following channel (<#${channel}>) has been activated. You will appear within the next rotation.`,
      });
    } catch {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_coffee_chat_bot: {
            channel: body.channel_id,
            user_id,
            status: "Failed to activate user",
          },
        },
      ]);

      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: "Failed to activate your coffee chat activity. You will not appear within the next rotation. ",
      });
    }
  });
};

export const coffee_chat_bio = () => {
  app.command("/coffee-bio", async ({ ack, body, client }) => {
    await ack();
    const trigger_id = body.trigger_id;
    const user_data = await get_shuffle_bot_user(body.user_id);
    try {
      await client.views.open({
        trigger_id,
        view: shuffle_bot_bio_modal(body.user_name, {
          intro: user_data.bio.intro ?? "",
          pronouns: user_data.bio.pronouns ?? "",
          location: user_data.bio.location ?? "",
          title: user_data.bio.title ?? "",
        }),
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          coffee_chat_bot: {
            channel: body.channel_id,
            user_id: user_data.user_id,
            user_name: body.user_name,
            status: "Bio modal opened",
          },
        },
      ]);
    } catch {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_coffee_chat_bot: {
            channel: body.channel_id,
            user_id: user_data.user_id,
            status: "Failed to open coffee chat bio modal",
          },
        },
      ]);
    }
  });
};

export const handle_coffee_chat_bio_submit = () => {
  app.view("coffee-chat-bio-modal", async ({ ack, view, body }) => {
    try {
      await ack();

      const view_values = view.state.values;
      const pronouns = view_values["pronouns-action-block"]
        ? view_values["pronouns-action-block"]["pronouns-action"]?.value
        : undefined;

      const title = view_values["title-action-block"]
        ? view_values["title-action-block"]["title-action"]?.value
        : undefined;

      const location = view_values["location-action-block"]
        ? view_values["location-action-block"]["location-action"]?.value
        : undefined;

      const intro = view_values["intro-action-block"]
        ? view_values["intro-action-block"]["intro-action"]?.value
        : undefined;

      const user_id = body.user.id;

      const bio = {
        pronouns: pronouns ?? "",
        title: title ?? "",
        location: location ?? "",
        intro: intro ?? "",
      };

      await update_shuffle_bot_bio(user_id, bio);
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          coffee_chat_bot: {
            user_id: body.user.id,
            user_name: body.user.name,
            status: "Bio updated",
          },
        },
      ]);
    } catch {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_coffee_chat_bot: {
            user_id: body.user.id,
            user_name: body.user.name,
            status: "Failed to submit coffee chat bio",
          },
        },
      ]);
    }
  });
};

export const handle_close_coffee_chat_bio_modal = () => {
  app.view(
    { callback_id: "coffee-chat-bio-modal", type: "view_closed" },
    async ({ ack }) => {
      await ack();
    }
  );
};
