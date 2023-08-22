import app from "../../utils/config/slack-config.ts";
import client from "../../utils/config/axiom-config.ts";

export const sayHello = () => {
  app.message("Hej devs", async ({ say, body, logger }) => {
    try {
      await client.ingestEvents("slack-bot", [{ say_hello: body }]);
    } catch (e) {
      logger.error(e);
      await client.ingestEvents("slack-bot", [{ say_hello_error: e }]);
    }

    await say("hello there");
  });
};
