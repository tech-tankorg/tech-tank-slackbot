import { prisma } from "../config/prisma.ts";

import { endOfWeek, getWeek, getYear, isBefore } from "date-fns";

export const get_welcomes = async (id: string) => {
  return await prisma.welcomes.findFirst({ where: { week_id: id } });
};

const update_welcomes = async (lst: string[], id: string) => {
  await prisma.welcomes.update({
    where: { week_id: id },
    data: {
      users: lst,
    },
  });
};

const create_welcomes = async (week_id: string, users: string[]) => {
  await prisma.welcomes.create({ data: { week_id, users } });
};

export const append_user_to_welcome_lst = async (user_id: string) => {
  // Given a date, determine the end of the week
  // Then check if the date for the doc is before that end date
  // if so, then append user_id to the users array
  // otherwise create a new doc with the users array and timestamp
  const now = new Date();
  const doc_id = `week-${getWeek(now)}-${getYear(now)}`;
  const end_of_current_week = endOfWeek(now);

  const welcomes = await get_welcomes(doc_id);

  if (isBefore(now, end_of_current_week) && welcomes) {
    const users_array = welcomes?.users as unknown as string[];
    users_array.push(user_id);
    await update_welcomes(users_array, doc_id);
  } else {
    await create_welcomes(doc_id, [user_id]);
  }
};
