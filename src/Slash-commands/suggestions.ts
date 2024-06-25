import Axiom from "../../utils/config/axiom-config.ts";
import app from "../../utils/config/slack-config.ts";

import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { create_suggestion } from "../../utils/controllers/create-suggestion.ts";
import { generate_suggestion_notification_message } from "../../utils/helpers/misc/generate_message.ts";

import { channels } from "../../utils/config/channel-config.ts";

export const suggestion = () => {
  app.command("/suggestion", async ({ ack, body, respond, client }) => {
    await ack();

    try {
      const suggestion = body.text;
      const user_id = body.user_id;
      const user_profile = await client.users.profile.get({ user: user_id });
      const user_name = user_profile.profile?.display_name_normalized ?? "";

      if (suggestion === "")
        throw new Error("Suggestion cannot be empty. Try again!");

      const message = generate_suggestion_notification_message(
        user_id,
        suggestion
      );

      await create_suggestion(suggestion, user_id, user_name);

      await client.chat.postMessage({
        channel: channels.notification,
        ...message,
      });

      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: "Your suggestion has successfully been submitted!",
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          suggestion: {
            suggestion,
            user_id,
            user_name,
          },
        },
      ]);
    } catch (err) {
      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: "Oh no! Something went wrong! \nTry again later.",
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          suggestion_error: {
            err,
            user_id: body.user_id,
            user_name: body.user_name,
          },
        },
      ]);
    }
  });
};
