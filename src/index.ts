// import app from "@utils/config/slack-config.ts";
import app from "../utils/config/slack-config.ts";
import { greet_new_team_member } from "./Events/greetings.ts";

greet_new_team_member();

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
