import { send_message } from "../../utils/helpers/general/send-message.ts";
import { survey_intro_message } from "../../utils/constants/survey_question_schema.ts";
import app from "../../utils/config/slack-config.ts";

import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { bots } from "../../utils/config/channel-config.ts";

export const survey = async () => {
  try {
    const excluded_ids = Object.values(bots);
    const users = await app.client.users.list();
    const user_ids =
      users.members
        ?.filter(
          (item) => !excluded_ids.includes(item?.id ?? "") && !item.is_bot
        )
        .map((member) => member.id ?? "") ?? [];

    const sent_messages = await Promise.all(
      user_ids.map((user) =>
        send_message({
          group: "user",
          text: "Please take a moment to complete the survey",
          id: user ?? "",
          input: { type: "blocks", blocks: survey_intro_message(user) },
        })
      )
    );

    const sent_all = sent_messages.every((message) => message.ok);

    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      {
        nemo_survey: {
          number_messaged_users: user_ids.length,
          all_sent: sent_all,
          status: "ok",
        },
      },
    ]);
  } catch (error) {
    await Axiom.ingestEvents(AXIOM_DATA_SET, [
      {
        nemo_survey: {
          all_sent: false,
          status: "failed to send message",
        },
      },
    ]);
  }
};
