import app from "../../utils/config/slack-config.ts";

export const sayHello = () => {
  app.message("Hej devs", async ({ say }) => {
    say("hello there");
  });
};
