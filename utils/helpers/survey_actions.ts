import app from "../config/slack-config.ts";
import type { InteractiveMessage } from "@slack/bolt";
import { survey_modal_schema } from "../constants/survey_question_modal.ts";

export const open_survey_modal = () => {
  app.action("open-survey-modal", async ({ ack, body, client }) => {
    await ack();

    //biome-ignore lint: needs to be here
    const pre_body = body as any;

    try {
      const view = await client.views.open({
        trigger_id: pre_body.trigger_id,
        view: survey_modal_schema(body.user.id),
      });

      console.log(view);
    } catch (error) {
      console.log(error);
    }
  });
};
