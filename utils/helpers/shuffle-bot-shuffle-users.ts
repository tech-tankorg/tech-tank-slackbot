import type { shuffle_group } from "../types/projectTypes.ts";
import { randomize_list } from "./randomize-list.ts";

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

  const newGroup = new Array(
    Math.floor(active_users.length / people_per_group)
  ).map(() => [""]);

  generate_master_array_shuffled(active_users);

  let index = 0;

  for (const user of active_users) {
    if (newGroup.length === 0) break;
    if (newGroup[index].length <= people_per_group) {
      // check if the number of people in the group does not exceeed the setting
      newGroup[index]?.push(user);
    } else {
      index++;
      newGroup[index]?.push(user);
    }
  }

  return newGroup;
};
