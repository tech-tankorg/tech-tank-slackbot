import app from "../../utils/config/slack-config.ts";
import Axiom from "../../utils/config/axiom-config.ts";

import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { create_suggestion } from "../../utils/controllers/create-suggestion.ts";
import { generate_notification_message } from "../../utils/helpers/generate_message.ts";

import { channels } from "../../utils/config/channel-config.ts";

import { SUGGESTION_REGEX } from "../../utils/constants/consts.ts";

export const suggestion = () => {
  app.command(SUGGESTION_REGEX, async ({ ack, body, respond, client }) => {
    await ack();

    try {
      const tag = body.command.split("/")[1] ?? "";
      const suggestion = body.text;
      const user_id = body.user_id;
      const user_name = body.user_name;

      if (suggestion === "")
        throw new Error("Suggestion cannot be empty. Try again!");

      const message = generate_notification_message(user_name, suggestion, tag);

      create_suggestion(tag, suggestion, user_id, user_name);

      await Promise.all([
        client.chat.postMessage({
          channel: channels.notification,
          ...message,
        }),
        respond({
          response_type: "ephemeral",
          mrkdwn: true,
          text: `Your suggestion has successfully been submitted!`,
        }),
        Axiom.ingestEvents(AXIOM_DATA_SET, [
          {
            suggestion: {
              tag,
              suggestion,
              user_id,
              user_name,
            },
          },
        ]),
      ]);
    } catch (err) {
      await Promise.all([
        respond({
          response_type: "ephemeral",
          mrkdwn: true,
          text: `Oh no! Something went wrong! \nTry again later.`,
        }),
        Axiom.ingestEvents(AXIOM_DATA_SET, [{ suggestion_error: err }]),
      ]);
    }
  });
};
