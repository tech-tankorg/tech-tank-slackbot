import { send_message } from "../../utils/helpers/general/send-message.ts";
import { survey_intro_message } from "../../utils/constants/survey_question_schema.ts";
import { admins } from "../../utils/config/channel-config.ts";

export const survey = async () => {
  // const users = await app.client.users.list({});
  // const members = users.members?.map((member) => member.id ?? "") ?? [];

  // remove after testing
  const user_ids = Object.values(admins);

  await Promise.all(
    user_ids.map((user) =>
      send_message({
        group: "user",
        id: user,
        input: { type: "blocks", blocks: survey_intro_message(user) },
      })
    )
  );
};
