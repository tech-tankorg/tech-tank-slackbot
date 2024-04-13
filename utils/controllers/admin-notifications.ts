import { prisma } from "../config/prisma.ts";

export const create_admin_notification = async (
  message: string,
  user_id: string,
  user_name: string
) => {
  await prisma.admin_notifications.create({
    data: { message, user_id, user_name },
  });
};
