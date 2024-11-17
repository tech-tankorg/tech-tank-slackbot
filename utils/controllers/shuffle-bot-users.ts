import { prisma } from "../config/prisma.ts";
import { shuffle_bot_user } from "../types/zod-types.ts";

export const create_shuffle_bot_user = async (
  user_id: string,
  user_name: string,
  user_image: string
) => {
  const bio = {
    pronouns: "",
    title: "",
    location: "",
    interests: "",
    intro: "",
    img_url: user_image,
  };

  await prisma.shuffle_users.create({ data: { user_id, user_name, bio } });
};

export const update_shuffle_bot_bio = async (
  user_id: string,
  bio: {
    pronouns: string;
    title: string;
    location: string;
    intro: string;
  }
) => {
  await prisma.shuffle_users.update({ where: { user_id }, data: { bio } });
};

export const update_shuffle_activity = async (
  user_id: string,
  is_active: boolean
) => {
  await prisma.shuffle_users.update({
    where: { user_id },
    data: { is_active },
  });
};

export const delete_shuffle_bot_user = async (user_id: string) => {
  await prisma.shuffle_users.delete({ where: { user_id } });
};

export const get_shuffle_bot_user = async (user_id: string) => {
  const doc = await prisma.shuffle_users.findFirst({ where: { user_id } });

  const user_data = shuffle_bot_user.parse(doc);

  return user_data;
};

export const get_all_active_shuffle_bot_users = async () => {
  const doc = await prisma.shuffle_users.findMany({
    where: { is_active: { equals: true } },
  });

  return doc.map((doc) => shuffle_bot_user.parse(doc));
};
