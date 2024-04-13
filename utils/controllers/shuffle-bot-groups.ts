import { getWeek, getYear } from "date-fns";

import { shuffle_bot_groups } from "../types/zod-types.ts";

import type { shuffle_group } from "../types/projectTypes.ts";

import { prisma } from "../config/prisma.ts";

export const get_previous_week_shuffles = async () => {
  const now = new Date();
  const doc_id = `week-${getWeek(now) - 1}-${getYear(now)}`;

  const doc = await prisma.shuffle_groups.findFirst({
    where: { week_id: doc_id },
  });

  const data = shuffle_bot_groups.parse(doc);

  return data;
};

export const create_shuffle_groups = async (groups: shuffle_group) => {
  const now = new Date();
  const doc_id = `week-${getWeek(now)}-${getYear(now)}`;

  await prisma.shuffle_groups.create({ data: { groups, week_id: doc_id } });
};
