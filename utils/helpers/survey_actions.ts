import app from "../config/slack-config.ts";
import { assertFunc } from "../types/type-assersions.ts";
import { survey_modal_schema } from "../constants/survey_question_modal.ts";

import { key_is_present } from "../helpers/obj-has-property.ts";

// biome-ignore lint:needed
const choose_option = (obj: any) => {
  if (key_is_present(obj, "selected_option")) return obj.selected_option;
  if (key_is_present(obj, "selected_options")) return obj.selected_options;

  return obj;
};

// biome-ignore lint:needed
const getValue = (options: any) => {
  const value = Array.isArray(options)
    ? options.map((option) => option.value)
    : options.value;
  return value;
};

// ++++++++++++
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

      // console.log(view);
    } catch (error) {
      console.log(error);
    }
  });
};

export const survey_submit = () => {
  app.view("survey-modal", async ({ ack, view, body, context }) => {
    await ack();

    //biome-ignore lint:needed
    const q1 = view.blocks[2] as any;
    const q1_block_id = q1?.block_id;
    const q1_action_id = key_is_present(view.blocks[2], "accessory")
      ? q1?.accessory?.action_id
      : q1?.element?.action_id;

    //biome-ignore lint:needed
    const q2 = view.blocks[3] as any;
    const q2_block_id = q2?.block_id;
    const q2_action_id = key_is_present(view.blocks[3], "accessory")
      ? q2?.accessory?.action_id
      : q2?.element?.action_id;

    try {
      const view_values_q1 = view.state.values[q1_block_id];
      const view_values_q2 = view.state.values[q2_block_id];

      assertFunc(view_values_q1, q1_action_id);
      assertFunc(view_values_q2, q2_action_id);

      const pre_1 = choose_option(view_values_q1[q1_action_id]);
      const pre_2 = choose_option(view_values_q2[q2_action_id]);

      const answer_1 = getValue(pre_1);
      const answer_2 = getValue(pre_2);

      const user_select = {
        user_id: body.user.id,
        user_name: body.user.name,
        question_1: { q: q1?.label.text, a: answer_1 },
        question_2: { q: q2?.label.text, a: answer_2 },
      };
      console.log(user_select);
    } catch (error) {
      console.log(error);
    }
  });
};
