import { getWeek, getYear } from "date-fns";

import app from "../../utils/config/slack-config.ts";

import { welcomes_type } from "../../utils/types/zod-types.ts";

import { channels } from "../../utils/config/channel-config.ts";

import axiom from "../../utils/config/axiom-config.ts";

import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { get_welcomes } from "../../utils/controllers/welcomes.ts";

const format_users_array = (lst: string[]) => {
  return lst.map((item) => `<@${item}>`);
};

export const send_weekly_welcome_message = async () => {
  const now = new Date();
  const doc_id = `week-${getWeek(now) - 1}-${getYear(now)}`;

  try {
    const doc = await get_welcomes(doc_id);

    const parsed_doc = welcomes_type.parse(doc);
    const formatted_users_array = format_users_array(parsed_doc.users);

    if (parsed_doc.users.length >= 1) {
      const message = `Hey everyone! Please join us in welcoming our newest members ${formatted_users_array.join(
        ", "
      )} to the tank!:tech_tank: :tech_tank: `;
      await app.client.chat.postMessage({
        channel: channels.intro,
        text: message,
      });

      await axiom.ingestEvents(AXIOM_DATA_SET, [
        { weekly_welcome_message: { status: "sent" } },
      ]);
    }
  } catch (e) {
    await axiom.ingestEvents(AXIOM_DATA_SET, [
      { error_weekly_welcome_message: { status: "not-sent", error: e } },
    ]);
  }
};
