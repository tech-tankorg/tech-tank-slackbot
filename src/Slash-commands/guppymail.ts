import Axiom from "../../utils/config/axiom-config.ts";
import app from "../../utils/config/slack-config.ts";

import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { create_mail } from "../../utils/controllers/guppymail-controller.ts";
import { generate_guppymail_message } from "../../utils/helpers/misc/generate_message.ts";

import { channels } from "../../utils/config/channel-config.ts";

export const guppymail = () => {
  app.command("/guppymail", async ({ ack, body, respond, client }) => {
    await ack();
    try {
      const user_message = body.text;
      if (user_message === "")
        throw new Error("message cannot be empty. Try again!");

      const is_anonymous = !!user_message.match(/!private/s);
      const user_id = is_anonymous ? "XXXXXXXXX" : body.user_id;

      const sanitized_mail = is_anonymous
        ? user_message.replace("!private", "")
        : user_message;

      const message = generate_guppymail_message(
        user_id,
        sanitized_mail,
        is_anonymous
      );

      await create_mail(sanitized_mail, user_id, is_anonymous);

      await client.chat.postMessage({
        channel: channels.guppymail,
        ...message,
      });

      const respond_message = is_anonymous
        ? "Your message has been sent anonymously"
        : "Your message has been sent";

      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: respond_message,
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          guppymail: {
            status: "message saved",
            user_id,
            is_anonymous,
          },
        },
      ]);
    } catch (error) {
      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: "Oh no! Something went wrong! \nTry again later.",
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_guppymail: {
            error,
            user_id: body.user_id,
            user_name: body.user_name,
          },
        },
      ]);
    }
  });
};
