import { prisma } from "../config/prisma.ts";

export const create_mail = async (
  message: string,
  user_id: string,
  is_anonymous: boolean
) => {
  await prisma.guppymail.create({
    data: { message, user_id, is_anonymous },
  });
};
