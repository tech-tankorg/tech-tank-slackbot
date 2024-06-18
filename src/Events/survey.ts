import { send_message } from "../../utils/helpers/send-message.ts";
import { survey_intro_message } from "../../utils/constants/survey_question_schema.ts";

export const survey = async () => {
  // generate block of questions

  // Given an array of questions, generate the JSON formatted block and then compile the final array

  // const users = await app.client.users.list({});
  // const members = users.members?.map((member) => member.id ?? "") ?? [];

  const user_id = "U05BYP96Q6B";

  await send_message({
    group: "user",
    id: user_id,
    input: { type: "blocks", blocks: survey_intro_message(user_id) },
  });
};
