import { prisma } from "../config/prisma.ts";

export const add_user_to_db = async (
  user_name: string,
  user_id: string,
  coc_ack: "accepted" | "denied"
) => {
  const doc = await prisma.users.findFirst({ where: { user_id } });

  if (!doc)
    await prisma.users.create({ data: { user_name, user_id, coc: coc_ack } });

  if (
    !Object.hasOwn(doc ?? {}, "coc") &&
    !Object.hasOwn(doc ?? {}, "coc_ack_timestamp")
  )
    await prisma.users.update({
      where: { user_id },
      data: { coc: coc_ack, coc_ack_timestamp: new Date() },
    });
};

export const has_user_ack_coc = async (user_id: string) => {
  const docs = await prisma.users.findMany({
    where: { user_id: { equals: user_id } },
    orderBy: { coc_ack_timestamp: "desc" },
  });

  return docs[0]?.coc;
};
