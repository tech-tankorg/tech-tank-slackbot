import Axiom from "../../utils/config/axiom-config.ts";
import app from "../../utils/config/slack-config.ts";

import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { create_admin_notification } from "../../utils/controllers/admin-notifications.ts";
import { generate_admin_notification_message } from "../../utils/helpers/generate_message.ts";

import { channels } from "../../utils/config/channel-config.ts";

import Sentry from "../../utils/config/sentry.config.ts";

const transaction = Sentry.startTransaction({
  op: "admin-notification-system",
  name: "Admin notification system",
});

export const notify_admins = () => {
  app.command("/notify-admins", async ({ ack, body, respond, client }) => {
    await ack();

    try {
      const user_message = body.text;
      const user_id = body.user_id;
      const user_profile = await client.users.profile.get({ user: user_id });
      const user_name = user_profile.profile?.display_name_normalized ?? "";

      if (user_message === "")
        throw new Error("message cannot be empty. Try again!");

      const message = generate_admin_notification_message(
        user_id,
        user_message
      );

      await create_admin_notification(user_message, user_id, user_name);

      await client.chat.postMessage({
        channel: channels.notification,
        ...message,
      });

      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: "Your message has successfully been submitted!",
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          notify_admins: {
            user_message,
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
          error_notify_admins: {
            err,
            user_id: body.user_id,
            user_name: body.user_name,
          },
        },
      ]);
      Sentry.captureException(err);
    } finally {
      transaction.finish();
    }
  });
};
