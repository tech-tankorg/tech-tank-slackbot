import client from "../../utils/config/axiom-config.ts";
import app from "../../utils/config/slack-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

export const sayHello = () => {
  app.message("Hej devs", async ({ say, body, logger }) => {
    try {
      await client.ingestEvents(AXIOM_DATA_SET, [{ say_hello: body }]);
    } catch (e) {
      logger.error(e);
      await client.ingestEvents(AXIOM_DATA_SET, [{ say_hello_error: e }]);
    }

    await say("hello there");
  });
};
