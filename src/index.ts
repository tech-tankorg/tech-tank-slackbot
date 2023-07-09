// import app from "@utils/config/slack-config.ts";
import app from "../utils/config/slack-config.ts";
import client from "../utils/config/axiom-config.ts";
import { greet_new_team_member } from "./Events/greetings.ts";
import { sayHello } from "./Events/sayHello.ts";
import { Jokes } from "./Slash-commands/jokes.ts";
import { send_scheduled_message } from "./Events/send-scheduled-message.ts";
import { wonder_wednesday_schedule_message } from "./Events/wonder-wednesday-schedule-message.ts";

import {
  GENERAL_QUESTIONS_START_DATE,
  WONDER_WEDNESDAY_QUESTIONS_START_DATE,
} from "../utils/constants/consts.ts";
import { channels } from "../utils/config/channel-config.ts";

import { AXIOM_DATA_SET } from "../utils/constants/consts.ts";

import { flatten_object } from "../utils/helpers/flatten-object.ts";
import questions from "../utils/constants/general-questions.json" assert { type: "json" };
import wonder_wednesday_questions from "../utils/constants/wonder-wednesday-questions.json" assert { type: "json" };

const PREPPED_QUESTIONS = flatten_object(questions);
const test_channel = "C05BYP98MTR";
const test_channel_two = "C05C6KVHWAJ";

// This command is for testing purposes. Leave here in case we want to test in the future.
sayHello();
greet_new_team_member();
Jokes();
send_scheduled_message(
  PREPPED_QUESTIONS,
  test_channel,
  GENERAL_QUESTIONS_START_DATE,
  "thursday"
);

wonder_wednesday_schedule_message(
  wonder_wednesday_questions,
  test_channel_two,
  WONDER_WEDNESDAY_QUESTIONS_START_DATE,
  "wednesday"
);

(async () => {
  // Start your app
  await app.start();

  await client.ingestEvents(AXIOM_DATA_SET, [{ start: "App has started" }]);

  console.log("⚡️ Bolt app is running!");
})();
