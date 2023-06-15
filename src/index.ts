// import app from "@utils/config/slack-config.ts";
import app from "../utils/config/slack-config.ts";
import { greet_new_team_member } from "./Events/greetings.ts";
import { sayHello } from "./Events/sayHello.ts";

greet_new_team_member();
sayHello();

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
