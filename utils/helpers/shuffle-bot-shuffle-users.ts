import type { shuffle_group } from "../types/projectTypes.ts";
import { randomize_list } from "./randomize-list.ts";

const generate_master_array_shuffled = (groups: shuffle_group) => {
  const master_array: Array<string> = [];
  for (let i = 0; i <= groups.length; i++) {
    const temp_arr = groups[i]?.groups;

    if (temp_arr === undefined) continue;

    master_array.push(...temp_arr);
  }

  for (let i = 0; i < 3; i++) {
    randomize_list(master_array);
  }

  return master_array;
};

const is_active_user = (user_id: string, active_user_lst: Array<string>) => {
  return active_user_lst.includes(user_id);
};

export const shuffle_users = (
  groups: shuffle_group,
  active_users: Array<string>,
  people_per_group: number
) => {
  // load array into memory and then select each
  // load all groups into a large array, shuffle the array and then determine new groups
  let index = 0;
  const newGroup: shuffle_group = new Array(groups.length);

  const shuffled_master_array = generate_master_array_shuffled(groups);

  for (const user_id of shuffled_master_array) {
    if (newGroup[index]?.groups?.length < people_per_group) {
      if (is_active_user(user_id, active_users))
        newGroup[index].groups?.push(user_id);
    } else {
      index++;
      if (is_active_user(user_id, active_users))
        newGroup[index].groups?.push(user_id);
    }
  }

  return newGroup;
};
