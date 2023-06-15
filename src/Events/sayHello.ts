import app from "../../utils/config/slack-config.ts";

export const sayHello = () => {
  app.message("hello", async ({ say }) => {
    say("hello there");
  });
};
