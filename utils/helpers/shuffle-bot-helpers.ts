import { randomize_list } from "./randomize-list.ts";

import { shuffle_user_group_intro_msg } from "../constants/shuffle-bot-bio-modal.ts";

import { dm_lst_of_people } from "./send-message.ts";

import { flatten_array } from "./flatten-object.ts";

import type { shuffle_bot_user_type } from "../types/projectTypes.ts";

const generate_master_array_shuffled = (groups: Array<string>) => {
  for (let i = 0; i < 3; i++) {
    randomize_list(groups);
  }
};

export const shuffle_users = (
  active_users: Array<string>,
  people_per_group: number
) => {
  // load array into memory and then select each
  // load all groups into a large array, shuffle the array and then determine new groups

  const newGroup: Array<string[]> = [];
  let currentGroup: Array<string> = [];
  let group_size = 0;

  generate_master_array_shuffled(active_users);

  for (const user of active_users) {
    if (group_size < people_per_group) {
      currentGroup.push(user);
      group_size++;
    } else {
      newGroup.push(currentGroup);
      currentGroup = [user];
      group_size = 1;
    }
  }

  if (currentGroup.length === 1) {
    newGroup[newGroup.length - 1]?.push(currentGroup[0] ?? "");
  } else if (currentGroup.length === 2) {
    newGroup[newGroup.length - 1]?.push(currentGroup[0] ?? "");
    newGroup[newGroup.length - 2]?.push(currentGroup[1] ?? "");
  }

  return newGroup;
};

/**Create msg groups and send message to all users in the shuffled_new_users array
 */
export const create_group_sendMsg = async (
  shuffled_groups: string[][],
  all_active_users: shuffle_bot_user_type[]
) => {
  for (let i = 0; i <= shuffled_groups.length; i++) {
    const first_user = shuffled_groups[i]?.shift() ?? "";
    const additional_users = shuffled_groups[i] ?? [];

    // Get the profiles for the users in the current group
    const group_profiles = all_active_users.filter(
      (profile) =>
        profile.user_id === first_user ||
        additional_users.includes(profile.user_id)
    );

    // Construct the message to be sent in the current group
    const profile_message_lst = group_profiles.map((profile) =>
      shuffle_user_group_intro_msg(profile)
    );

    const blocks_message = flatten_array(profile_message_lst);

    await dm_lst_of_people(
      [first_user],
      { type: "blocks", blocks: blocks_message },
      additional_users.join(",") ?? ""
    );
  }
};
