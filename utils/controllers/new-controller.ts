import { prisma } from "../config/prisma.ts";

export const addUser = async () => {
  await prisma.user.create({
    data: { email: "test@test.com", name: "test user" },
  });
};
