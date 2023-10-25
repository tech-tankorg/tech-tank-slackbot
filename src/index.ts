// import app from "@utils/config/slack-config.ts";
import app from "../utils/config/slack-config.ts";
import client from "../utils/config/axiom-config.ts";

import { greet_new_team_member } from "./Events/greetings.ts";
import { sayHello } from "./Events/sayHello.ts";

import { app_home_opened } from "./Events/app_home.ts";
import {
  open_coc_modal,
  accept_coc,
  deny_coc,
} from "./Events/open_coc_modal.ts";
import { thanks } from "../src/Events/thanks.ts";

import { jokes } from "./Slash-commands/jokes.ts";
import { suggestion } from "./Slash-commands/suggestions.ts";
import { notify_admins } from "./Slash-commands/notify-admins.ts";
import { check_non_inclusive_words } from "./Events/inclusive.ts";

import { AXIOM_DATA_SET } from "../utils/constants/consts.ts";

// const PREPPED_QUESTIONS = flatten_object(questions);
// const test_channel = "C05BYP98MTR";
// const test_channel_two = "C05C6KVHWAJ";

// Events
sayHello();
greet_new_team_member();

// Temporally disables the questions
// void thoughtful_thursday_send_scheduled_message(
//   PREPPED_QUESTIONS,
//   channels.general,
//   GENERAL_QUESTIONS_START_DATE,
//   "thursday",
//   1
// );

// void wonder_wednesday_send_schedule_message(
//   wonder_wednesday_questions,
//   channels.study,
//   WONDER_WEDNESDAY_QUESTIONS_START_DATE,
//   "wednesday",
//   2
// );

app_home_opened();
check_non_inclusive_words();

// Slash commands
jokes();
suggestion();
open_coc_modal();
notify_admins();

// actions
accept_coc();
deny_coc();

void thanks();

await (async () => {
  // Start your app
  await app.start();

  await client.ingestEvents(AXIOM_DATA_SET, [{ start: "App has started" }]);

  console.log("⚡️ Bolt app is running!");
})();
