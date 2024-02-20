import app from "../../utils/config/slack-config.ts";
import { create_shuffle_groups } from "../../utils/controllers/shuffle-bot-groups.ts";
import {
  get_all_shuffle_bot_users,
  create_shuffle_bot_user,
  delete_shuffle_bot_user,
  update_shuffle_activity,
  update_shuffle_bot_bio,
} from "../../utils/controllers/shuffle-bot-users.ts";
import { shuffle_users } from "../../utils/helpers/shuffle-bot-shuffle-users.ts";

import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import {
  shuffle_bot_bio_modal,
  coffee_chat_intro_message,
  coffee_chat_shuffle_channel_msg,
  shuffle_user_group_intro_msg,
} from "../../utils/constants/shuffle-bot-bio-modal.ts";

import {
  send_message,
  dm_lst_of_people,
} from "../../utils/helpers/send-message.ts";

import {
  channels,
  coffee_chat_config,
} from "../../utils/config/channel-config.ts";

import { flatten_array } from "../../utils/helpers/flatten-object.ts";

/**
 * Creates a brand new shuffle for users
 *
 * Gets all active users and filters for just the ID's.
 * Shuffles users into groups of a specified size and then creates a private chat with all appropriate members
 * */

export const coffee_chat_bot_shuffle = async () => {
  const all_active_users = await get_all_shuffle_bot_users();
  const all_active_users_ids = all_active_users.map((user) => user.user_id);

  const shuffled_new_users = shuffle_users(
    all_active_users_ids,
    coffee_chat_config.users_per_group
  );

  await create_shuffle_groups(shuffled_new_users);

  // Create msg groups and send message to all users in the shuffled_new_users array
  for (let i = 0; i <= shuffled_new_users.length; i++) {
    const first_user = shuffled_new_users[i]?.shift() ?? "";
    const additional_users_lst = shuffled_new_users[i] ?? [];
    const additional_users = additional_users_lst[i] ?? "";

    const group_profiles = all_active_users.filter(
      (profile) =>
        profile.user_id === first_user ||
        additional_users_lst.includes(profile.user_id)
    );

    const profile_message_lst = group_profiles.map((profile) =>
      shuffle_user_group_intro_msg(profile)
    );

    const blocks_message = flatten_array(profile_message_lst);

    await dm_lst_of_people(
      [first_user],
      { type: "blocks", blocks: blocks_message },
      additional_users
    );
  }

  // post message in the channel that new groups have been made
  await send_message({
    id: channels.coffee_chat,
    input: {
      type: "blocks",
      blocks: coffee_chat_shuffle_channel_msg(new Date().toUTCString()),
    },
    group: "channel",
  });
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

      await send_message({
        id: event.user,
        input: {
          type: "blocks",
          blocks: coffee_chat_intro_message(event.user),
        },
        group: "user",
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          coffee_chat_bot: {
            channel: event.channel,
            user_id: event.user,
            user_name,
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
      await send_message({
        id: event.user,
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
  app.command("/coffee-chat-deactivate", async ({ ack, body, client }) => {
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

      await client.chat.postEphemeral({
        channel,
        user: user_id,
        text: `Your coffee chat activity in the following channel (<#${channel}>) has been deactived. You will not appear within the next rotation.`,
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
      await client.chat.postEphemeral({
        channel,
        user: user_id,
        text: "Failed to deactive your coffee chat activity. You will still appear within the next rotation. ",
      });
    }
  });
};

export const coffee_chat_user_activate = () => {
  app.command("/coffee-chat-activate", async ({ ack, body, client }) => {
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
      await client.chat.postEphemeral({
        channel,
        user: user_id,
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
      await client.chat.postEphemeral({
        channel,
        user: user_id,
        text: "Failed to activate your coffee chat activity. You will not appear within the next rotation. ",
      });
    }
  });
};

export const coffee_chat_bio = () => {
  app.command("/coffee-chat-bio", async ({ ack, body, client }) => {
    await ack();
    const trigger_id = body.trigger_id;
    await client.views.open({
      trigger_id,
      view: shuffle_bot_bio_modal(body.user_id),
    });
  });
};

export const handle_coffee_chat_bio_submit = () => {
  app.view("coffee-chat-bio-modal", async ({ ack, view, body }) => {
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
