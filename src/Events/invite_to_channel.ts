import app from "../../utils/config/slack-config.ts";
import { channels, admins, bots } from "../../utils/config/channel-config.ts";

import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

export const invite_to_channel = async () => {
  try {
    const general_channel = await app.client.conversations.members({
      channel: channels.mentor,
    });

    const excluded_ids = [...Object.values(admins), ...Object.values(bots)];

    const filtered_mentor_channel =
      general_channel.members !== undefined
        ? general_channel.members.filter((item) => !excluded_ids.includes(item))
        : [];

    const string_array_ids = filtered_mentor_channel.join(",");

    const invite_complete = await app.client.conversations.invite({
      channel: "",
      users: string_array_ids,
    });

    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      { invite_channel: invite_complete },
    ]);
  } catch (error) {
    await Axiom.ingestEvents(AXIOM_DATA_SET, [{ error_invite_channel: error }]);
  }
};
