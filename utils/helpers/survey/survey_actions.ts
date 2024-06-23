import app from "../../config/slack-config.ts";
import { assertFunc } from "../../types/type-assersions.ts";
import { survey_modal_schema } from "../../constants/survey_question_modal.ts";

import { key_is_present } from "../general/obj-has-property.ts";

import type { ViewStateValue } from "@slack/bolt";

import Axiom from "../../config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../constants/consts.ts";

import { getQuarter } from "date-fns";

import {
  save_survey_response,
  get_user_survey_response,
} from "../../controllers/survey-controller.ts";

import { send_message } from "../general/send-message.ts";

import { fromUnixTime, compareAsc, addWeeks } from "date-fns";

const choose_option = (obj: ViewStateValue | undefined) => {
  if (key_is_present(obj, "selected_option")) {
    assertFunc(obj, "selected_option");
    return obj.selected_option;
  }

  if (key_is_present(obj, "selected_options")) {
    assertFunc(obj, "selected_options");
    return obj.selected_options;
  }

  return obj;
};

// biome-ignore lint:needed
const getValue = (options: any) => {
  const value = Array.isArray(options)
    ? options.map((option) => option.value).join(" | ")
    : options.value;
  return value;
};

// ++++++++++++
export const open_survey_modal = () => {
  app.action("open-survey-modal", async ({ ack, body, client, respond }) => {
    await ack();
    const user_id = body.user.id;
    const today = new Date();
    const quarter = getQuarter(today);
    //biome-ignore lint: needs to be here
    const pre_body = body as any;

    const message_sent_ts = fromUnixTime(pre_body.message.ts);
    const two_week_after = addWeeks(message_sent_ts, 2);

    if (compareAsc(today, two_week_after) === 1) {
      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: "Sorry! The due date for the survey has passed. Please wait for the next one.",
      });
      return;
    }

    const user_survey_responses = await get_user_survey_response(user_id);

    const user_has_submitted = user_survey_responses.find(
      (response) => response.quarter === quarter
    );

    if (user_has_submitted) {
      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: "You've already submitted a survey for this quarter",
      });
      return;
    }

    try {
      const view = await client.views.open({
        trigger_id: pre_body.trigger_id,
        view: survey_modal_schema(user_id),
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          nemo_survey: {
            user_id,
            status: "Survey opened",
            view: view.ok,
          },
        },
      ]);
    } catch (error) {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_nemo_survey: {
            user_id: body.user.id,
            status: "Survey failed to open",
            error: error,
          },
        },
      ]);
    }
  });
};

export const survey_submit = () => {
  app.view("survey-modal", async ({ ack, view, body }) => {
    await ack();

    const today = new Date();
    const quarter = getQuarter(today);

    //biome-ignore lint:needed
    const q1 = view.blocks[2] as any;
    const q1_block_id = q1?.block_id;
    const q1_action_id = key_is_present(view.blocks[2], "accessory")
      ? q1?.accessory?.action_id
      : q1?.element?.action_id;

    //biome-ignore lint:needed
    const q1_id_block = view.blocks[3] as any;
    const q1_id = q1_id_block.elements[0].text;

    //biome-ignore lint:needed
    const q2 = view.blocks[4] as any;
    const q2_block_id = q2?.block_id;
    const q2_action_id = key_is_present(view.blocks[3], "accessory")
      ? q2?.accessory?.action_id
      : q2?.element?.action_id;

    //biome-ignore lint:needed
    const q2_id_block = view.blocks[5] as any;
    const q2_id = q2_id_block.elements[0].text;

    try {
      const view_values_q1 = view.state.values[q1_block_id];
      const view_values_q2 = view.state.values[q2_block_id];

      assertFunc(view_values_q1, q1_action_id);
      assertFunc(view_values_q2, q2_action_id);

      const pre_1 = choose_option(view_values_q1[q1_action_id]);
      const pre_2 = choose_option(view_values_q2[q2_action_id]);

      const question_1 = key_is_present(q1, "label")
        ? q1.label.text
        : q1.text.text;
      const question_2 = key_is_present(q2, "label")
        ? q2.label.text
        : q2.text.text;
      const answer_1 = getValue(pre_1);
      const answer_2 = getValue(pre_2);

      const user_select = {
        user_id: body.user.id,
        quarter,
        question_1: { q: question_1, a: answer_1, question_id: q1_id },
        question_2: { q: question_2, a: answer_2, question_id: q2_id },
      };

      await save_survey_response(user_select);

      await send_message({
        group: "user",
        id: user_select.user_id,
        input: {
          type: "msg",
          message:
            "You're response has been saved and we appreciate you submitting the survey!:blue_heart::tech_tank:",
        },
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          nemo_survey: {
            user_id: body.user.id,
            user_name: body.user.name,
            status: "Survey saved",
          },
        },
      ]);
    } catch (error) {
      await send_message({
        group: "user",
        id: body.user.id,
        input: {
          type: "msg",
          message:
            "Oh no! Something went wrong when saving your response. Try again later!",
        },
      });

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_nemo_survey: {
            user_id: body.user.id,
            user_name: body.user.name,
            status: "Survey failed to save",
            error: error,
          },
        },
      ]);
    }
  });
};
