import { send_message } from "../../utils/helpers/general/send-message.ts";
import { survey_intro_message } from "../../utils/constants/survey_question_schema.ts";
import app from "../../utils/config/slack-config.ts";

import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

export const survey = async () => {
  const users = await app.client.users.list();
  const user_ids = users.members?.map((member) => member.id ?? "") ?? [];

  const sent_messages = await Promise.all(
    user_ids.map((user) =>
      send_message({
        group: "user",
        id: user,
        input: { type: "blocks", blocks: survey_intro_message(user) },
      })
    )
  );

  const sent_all = sent_messages.every((message) => message.ok === true);

  await Axiom.ingestEvents(AXIOM_DATA_SET, [
    {
      nemo_survey: {
        number_messaged_users: user_ids.length,
        all_sent: sent_all,
        status: "ok",
      },
    },
  ]);
};
