import { prisma } from "../utils/config/prisma.ts";

const main = async () => {
  await prisma.user.createMany({
    data: [
      { email: "s@email.com", name: "bot" },
      { name: "Yewande", email: "yewande@prisma.io" },
      { name: "Angelique", email: "angelique@prisma.io" },
    ],
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
