import app from "../../utils/config/slack-config.ts";
import axios from "axios";
import { joke_category } from "../../utils/types/zod-types.ts";
import { format_response_jokes } from "../../utils/helpers/format-response-jokes.ts";

import Axiom from "../../utils/config/axiom-config.ts";

import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

export const Jokes = () => {
  app.command("/jokes", async ({ ack, body, respond }) => {
    await ack();
    try {
      const pre_category = body.text.toLowerCase();

      const category = joke_category.parse(pre_category);

      const jokeRes = await axios.get(
        `https://v2.jokeapi.dev/joke/${category}?amount=1`
      );

      const joke = jokeRes.data;

      const formatted_joke = format_response_jokes(joke.type, joke);

      await respond({ ...formatted_joke });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        { jokes_slash_command: { formatted_joke, body } },
      ]);
    } catch (error) {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        { jokes_slash_command_error: { error, body } },
      ]);
      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: `oh no! Looks like something went wrong! Try again later and make sure you are only entering the available categories. \n Programming | Pun | Spooky`,
      });
    }
  });
};
