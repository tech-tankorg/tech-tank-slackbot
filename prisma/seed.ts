import { prisma } from "../utils/config/prisma.ts";

const main = async () => {
  await prisma.admin_notifications.createMany({
    data: [
      { user_name: "john", message: "great job", user_id: "U0336BO9NP2" },
      {
        user_name: "alice",
        message: "keep up the good work",
        user_id: "U0386KP5HQ1",
      },
      { user_name: "bob", message: "awesome!", user_id: "U0367MQ4LR8" },
      {
        user_name: "emma",
        message: "fantastic effort",
        user_id: "U0319RW2VJ5",
      },
      { user_name: "david", message: "well done", user_id: "U0302LN3HM9" },
      { user_name: "sarah", message: "amazing job", user_id: "U0348TD7FQ6" },
      { user_name: "alex", message: "brilliant work", user_id: "U0355ZG1PC4" },
      { user_name: "olivia", message: "excellent!", user_id: "U0371SN6KB0" },
      {
        user_name: "michael",
        message: "outstanding effort",
        user_id: "U0394XC8JL3",
      },
      { user_name: "emily", message: "kudos!", user_id: "U0326QR5VD7" },
    ],
  });

  await prisma.suggestions_bot.createMany({
    data: [
      {
        user_name: "john",
        suggestion: "We should organize a team-building event next month",
        user_id: "U0336BO9NP2",
      },
      {
        user_name: "alice",
        suggestion: "We need more coding challenges in the weekly newsletter",
        user_id: "U0386KP5HQ1",
      },
      {
        user_name: "bob",
        suggestion:
          "Adding a suggestion box in the office could help gather feedback",
        user_id: "U0367MQ4LR8",
      },
      {
        user_name: "emma",
        suggestion:
          "A monthly book club could promote learning and team bonding",
        user_id: "U0319RW2VJ5",
      },
      {
        user_name: "david",
        suggestion:
          "Implementing a mentorship program would benefit junior employees",
        user_id: "U0302LN3HM9",
      },
    ],
  });

  await prisma.welcomes.createMany({
    data: [
      {
        week_id: "week-23-2023",
        users: ["U0302LN3HM9", "U0319RW2VJ5", "U0386KP5HQ1"],
      },
      {
        week_id: "week-24-2023",
        users: ["U0336BO9NP2", "U0367MQ4LR8", "U0348TD7FQ6"],
      },
      {
        week_id: "week-25-2023",
        users: ["U0355ZG1PC4", "U0371SN6KB0", "U0394XC8JL3"],
      },
      {
        week_id: "week-26-2023",
        users: ["U0326QR5VD7", "U0302LN3HM9", "U0386KP5HQ1"],
      },
      {
        week_id: "week-27-2023",
        users: ["U0319RW2VJ5", "U0336BO9NP2", "U0367MQ4LR8"],
      },
    ],
  });

  await prisma.thanks.createMany({
    data: [
      {
        message: "for your contributions to StudyTank!",
        user_id_receiver: "U0326QR5VD7",
        user_id_sender: "U0302LN3HM9",
      },
      {
        message: "for your dedication to the project!",
        user_id_receiver: "U0336BO9NP2",
        user_id_sender: "U0386KP5HQ1",
      },
      {
        message: "for your hard work this week!",
        user_id_receiver: "U0336BO9NP2",
        user_id_sender: "U0319RW2VJ5",
      },
      {
        message: "for your creativity in problem-solving!",
        user_id_receiver: "U0348TD7FQ6",
        user_id_sender: "U0302LN3HM9",
      },
    ],
  });

  await prisma.users.createMany({
    data: [
      { user_id: "U0302LN3HM9", user_name: "Sally", coc: "accepted" },
      { user_id: "U0336BO9NP2", user_name: "John", coc: "denied" },
      { user_id: "U0386KP5HQ1", user_name: "Alice", coc: "accepted" },
      { user_id: "U0367MQ4LR8", user_name: "Bob", coc: "denied" },
    ],
  });

  await prisma.shuffle_groups.createMany({
    data: [
      {
        week_id: "week-34-2024",
        groups: [
          ["U0302LN3HM9", "U0336BO9NP2", "U0386KP5HQ1", "U054MF49HGU"],
          ["U0348TD7FQ6", "U0386KP5HQ1", "U0302LN3HM9", "U054MF49HGU"],
        ],
      },
      {
        week_id: "week-35-2024",
        groups: [
          ["U0319RW2VJ5", "U0348TD7FQ6", "U0355ZG1PC4", "U054MF49HGU"],
          ["U0371SN6KB0", "U0394XC8JL3", "U0326QR5VD7", "U054MF49HGU"],
        ],
      },
      {
        week_id: "week-36-2024",
        groups: [
          ["U0302LN3HM9", "U0319RW2VJ5", "U0336BO9NP2", "U054MF49HGU"],
          ["U0367MQ4LR8", "U0371SN6KB0", "U0386KP5HQ1", "U054MF49HGU"],
        ],
      },
      {
        week_id: "week-37-2024",
        groups: [
          ["U0348TD7FQ6", "U0367MQ4LR8", "U0371SN6KB0", "U054MF49HGU"],
          ["U0355ZG1PC4", "U0386KP5HQ1", "U0394XC8JL3", "U054MF49HGU"],
        ],
      },
    ],
  });

  await prisma.shuffle_users.createMany({
    data: [
      {
        user_name: "john",
        user_id: "U0302LN3HM9",
        bio: {
          pronouns: "",
          title: "",
          location: "",
          interests: "",
          intro: "",
          img_url: "image_1",
        },
        is_active: false,
      },
      {
        user_name: "alice",
        user_id: "U0336BO9NP2",
        bio: {
          pronouns: "",
          title: "",
          location: "",
          interests: "",
          intro: "",
          img_url: "image_1",
        },
      },
      {
        user_name: "bob",
        user_id: "U0386KP5HQ1",
        bio: {
          pronouns: "",
          title: "",
          location: "",
          interests: "",
          intro: "",
          img_url: "image_1",
        },
      },
      {
        user_name: "emma",
        user_id: "U0367MQ4LR8",
        bio: {
          pronouns: "",
          title: "",
          location: "",
          interests: "",
          intro: "",
          img_url: "image_1",
        },
      },
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
