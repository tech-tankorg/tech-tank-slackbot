// import app from "@utils/config/slack-config.ts";
import app from "../utils/config/slack-config.ts";
import client from "../utils/config/axiom-config.ts";
import { greet_new_team_member } from "./Events/greetings.ts";
import { sayHello } from "./Events/sayHello.ts";

// This command is for testing purposes. Leave here in case we want to test in the future.
sayHello();
greet_new_team_member();

(async () => {
  // Start your app
  await app.start();

  await client.ingestEvents("slack-bot", [{ start: "App has started" }]);

  console.log("⚡️ Bolt app is running!");
})();
