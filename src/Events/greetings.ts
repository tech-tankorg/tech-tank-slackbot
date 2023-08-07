// import app from "@utils/config/slack-config";
// import { generate_welcome_message } from "@utils/helpers/generate_message";

import app from "../../utils/config/slack-config.ts";
import {
  generate_welcome_message,
  generate_mentee_message,
  generate_mentor_message,
} from "../../utils/helpers/generate_message.ts";
import Axiom from "../../utils/config/axiom-config.ts";
import { channels } from "../../utils/config/channel-config.ts";

import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { dm_lst_of_people } from "../../utils/helpers/send-message.ts";

export const greet_new_team_member = () => {
  app.event("team_join", async ({ event, client, logger }) => {
    try {
      // Call chat.postMessage with the built-in client

      const userId = event.user.id;
      const userInfo = await client.users.info({
        user: userId,
      });

      // Open a direct message channel with the user
      const channel = await client.conversations.open({
        users: userId,
      });

      const message = generate_welcome_message();

      // Send the private message
      const welcome_message_sent = await client.chat.postMessage({
        channel: channel.channel?.id ?? "",
        text: message,
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        { greeting_message: welcome_message_sent },
        { user_info: userInfo },
      ]);
    } catch (error) {
      logger.error(error);
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        { greeting_message_error: error },
      ]);
    }
  });
};

export const mentor_checkup = async () => {
  // if 15th of month, check two channels, send a a message checking in from admin.sammy,

  try {
    const mentor_channel = await app.client.conversations.members({
      channel: channels.mentor,
    });
    const mentee_channel = await app.client.conversations.members({
      channel: channels.mentee,
    });
    const today = new Date();

    if (today.getDate() === 15) {
      const mentees_messaged = await dm_lst_of_people(
        mentee_channel?.members ?? [],
        generate_mentee_message()
      );
      const mentors_messaged = await dm_lst_of_people(
        mentor_channel?.members ?? [],
        generate_mentor_message()
      );

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        { mentees_messaged, mentors_messaged },
      ]);
    }
  } catch (error) {
    await Axiom.ingestEvents(AXIOM_DATA_SET, [{ error_message_mentee: error }]);
  }
};
