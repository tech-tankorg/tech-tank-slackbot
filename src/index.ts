// import app from "@utils/config/slack-config.ts";
import app from "../utils/config/slack-config.ts";
import client from "../utils/config/axiom-config.ts";
import { greet_new_team_member } from "./Events/greetings.ts";
import { sayHello } from "./Events/sayHello.ts";
import { Jokes } from "./Slash-commands/jokes.ts";
import { schedule_message } from "./Events/schedule-message.ts";

import { AXIOM_DATA_SET } from "../utils/constants/consts.ts";

// This command is for testing purposes. Leave here in case we want to test in the future.
sayHello();
greet_new_team_member();
Jokes();
schedule_message();

(async () => {
  // Start your app
  await app.start();

  await client.ingestEvents(AXIOM_DATA_SET, [{ start: "App has started" }]);

  console.log("⚡️ Bolt app is running!");
})();
