import { subDays } from "date-fns";

import { create_thanks_usr_name_validation } from "../types/zod-types.ts";

import { format_thanks_reponse } from "../helpers/thanks/thanks-helpers.ts";

import { prisma } from "../config/prisma.ts";

export const create_thanks = async (
  user_id_receiver: string,
  user_id_sender: string,
  message: string
) => {
  const parsed_user_id_receiver =
    create_thanks_usr_name_validation.parse(user_id_receiver);

  const parsed_user_id_sender =
    create_thanks_usr_name_validation.parse(user_id_sender);

  await prisma.thanks.create({
    data: {
      user_id_sender: parsed_user_id_sender,
      user_id_receiver: parsed_user_id_receiver,
      message,
    },
  });
};

export const get_thanks = async () => {
  const start_of_last_week = subDays(new Date(), 8);
  const end_of_the_week = subDays(new Date(), 2);
  const docs = await prisma.thanks.findMany({
    where: {
      date_created: { gte: start_of_last_week, lte: end_of_the_week },
    },
  });

  return format_thanks_reponse(docs);
};
