import app from "../../utils/config/slack-config.ts";
import {
  get_previous_week_shuffles,
  create_shuffle_groups,
} from "../../utils/controllers/shuffle-bot-groups.ts";
import { get_all_shuffle_bot_users } from "../../utils/controllers/shuffle-bot-users.ts";
import { shuffle_users } from "../../utils/helpers/shuffle-bot-shuffle-users.ts";

import { dm_lst_of_people } from "../../utils/helpers/send-message-to-lst-of-people.ts";

export const coffee_chat_bot_shuffle = (allow_channels: string[]) => {
  app.event("member_joined_channel", async ({ event, client }) => {
    if (!allow_channels.includes(event.channel)) return;

    // get the last weeks group
    // shuffle the groups
    // create the new groups and save groups to db
    // message the new groups

    const previous_week_groups = await get_previous_week_shuffles();
    const all_active_users = await get_all_shuffle_bot_users();
    const all_active_users_ids = all_active_users.map((user) => user.user_id);

    const shuffled_new_users = shuffle_users(
      previous_week_groups.groups,
      all_active_users_ids,
      3
    );

    await create_shuffle_groups(shuffled_new_users);

    let index = 1;
    for (const user of shuffled_new_users) {
      await dm_lst_of_people([user[`group_${index}`][0]], "hello", [
        user[`group_${index}`][1],
        user[`group_${index}`][2],
      ]);
    }

    index++;
  });
};
