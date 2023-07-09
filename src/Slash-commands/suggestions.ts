import app from "../../utils/config/slack-config.ts";
import Axiom from "../../utils/config/axiom-config.ts";

import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { create_suggestion } from "../../utils/controllers/create-suggestion.ts";

export const suggestion_social = () => {
  app.command("/suggestion-social", async ({ ack, body, respond }) => {
    await ack();

    try {
      const tag = body.command.split("/")[1] ?? "";
      const suggestion = body.text;
      const createdAt = new Date().toUTCString();
      const user_id = body.user_id;
      const user_name = body.user_name;

      create_suggestion(tag, suggestion, createdAt, user_id, user_name);

      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: `Your suggestion has successfully been submitted!`,
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          suggestion: {
            tag,
            suggestion,
            createdAt,
            user_id,
            user_name,
          },
        },
      ]);
    } catch (err) {
      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: `Oh no! Something went wrong! \nTry again later.`,
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [{ suggestion_error: { err } }]);
    }
  });
};

export const suggestion_study = () => {
  app.command("/suggestion-study", async ({ ack, body, respond }) => {
    await ack();

    try {
      const tag = body.command.split("/")[1] ?? "";
      const suggestion = body.text;
      const createdAt = new Date().toUTCString();
      const user_id = body.user_id;
      const user_name = body.user_name;

      create_suggestion(tag, suggestion, createdAt, user_id, user_name);

      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: `Your suggestion has successfully been submitted!`,
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          suggestion: {
            tag,
            suggestion,
            createdAt,
            user_id,
            user_name,
          },
        },
      ]);
    } catch (err) {
      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: `Oh no! Something went wrong! \nTry again later.`,
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [{ suggestion_error: { err } }]);
    }
  });
};

export const suggestion_other = () => {
  app.command("/suggestion-other", async ({ ack, body, respond }) => {
    await ack();

    try {
      const tag = body.command.split("/")[1] ?? "";
      const suggestion = body.text;
      const createdAt = new Date().toUTCString();
      const user_id = body.user_id;
      const user_name = body.user_name;

      create_suggestion(tag, suggestion, createdAt, user_id, user_name);

      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: `Your suggestion has successfully been submitted!`,
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          suggestion: {
            tag,
            suggestion,
            createdAt,
            user_id,
            user_name,
          },
        },
      ]);
    } catch (err) {
      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: `Oh no! Something went wrong! \nTry again later.`,
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [{ suggestion_error: { err } }]);
    }
  });
};
