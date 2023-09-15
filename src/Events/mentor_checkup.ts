import app from "../../utils/config/slack-config.ts";
import {
  generate_mentee_message,
  generate_mentor_message,
} from "../../utils/helpers/generate_message.ts";
import Axiom from "../../utils/config/axiom-config.ts";
import { channels, admins, bots } from "../../utils/config/channel-config.ts";

import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { dm_lst_of_people } from "../../utils/helpers/send-message-to-lst-of-people.ts";

export const mentor_checkup = async () => {
  // if 15th of month, check two channels, send a a message checking in from admin.sammy,

  try {
    const mentor_channel = await app.client.conversations.members({
      channel: channels.mentor,
    });
    const mentee_channel = await app.client.conversations.members({
      channel: channels.mentee,
    });

    const filtered_mentor_channel =
      mentor_channel.members !== undefined
        ? mentor_channel.members.filter(
            (item) => item !== admins.sammy && item !== bots.nemo
          )
        : [];

    const filtered_mentee_channel =
      mentee_channel.members !== undefined
        ? mentee_channel.members.filter(
            (item) => item !== admins.sammy && item !== bots.nemo
          )
        : [];

    const today = new Date();

    if (today.getDate() === 15) {
      const mentees_messaged = await dm_lst_of_people(
        filtered_mentee_channel,
        generate_mentee_message(),
        admins.sammy
      );
      const mentors_messaged = await dm_lst_of_people(
        filtered_mentor_channel,
        generate_mentor_message(),
        admins.sammy
      );

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        { mentees_messaged, mentors_messaged },
      ]);
    }
  } catch (error) {
    await Axiom.ingestEvents(AXIOM_DATA_SET, [{ error_message_mentee: error }]);
  }
};
