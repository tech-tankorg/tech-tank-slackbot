import app from "../../utils/config/slack-config.ts";
import { get_survey_results } from "../../utils/controllers/survey-controller.ts";
import { randomBytes } from "node:crypto";
import { survey_results_schema } from "../../utils/types/zod-types.ts";
import { international_timezone_formatter } from "../../utils/helpers/custom-date-fns.ts";
import { is_admin } from "../../utils/helpers/feat-flag.ts";
import { format } from "date-fns";
import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { channels } from "../../utils/config/channel-config.ts";

import { upload_csv_to_slack } from "../../lib/slack_upload/index.ts";

const generate_values = (value = 16) => {
  return randomBytes(value).toString("hex");
};

const sanitize_string = (str: string) => {
  return str.replace(/,/g, "");
};

export const download_survey_results = () => {
  app.command("/survey-results", async ({ ack, body, respond }) => {
    await ack();
    const user_id = body.user_id;

    const is_allowed = is_admin(user_id);
    if (!is_allowed) {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          admin_commands: {
            user_id,
            user_name: body.user_name,
            message:
              "Attempted to access /survey-results command but does not have correct permissions",
          },
        },
      ]);
      await respond({
        response_type: "ephemeral",
        mrkdwn: true,
        text: "You do not have the correct permissions to access this command.",
      });

      return;
    }
    try {
      const file_path = process.cwd();
      const file_name = `temp-${generate_values()}`;
      const results_pre = await get_survey_results();
      const results = survey_results_schema.parse(results_pre);
      const today = new Date();
      const formatted_date = format(today, "MM_dd_yyyy");

      const columns = "created_at, quarter, qID, Question, Answer\n";

      const data = results
        .map(
          (result) =>
            `${sanitize_string(
              international_timezone_formatter(result.created_at)
            )},${result.quarter},"${result.response.question_1.question_id}","${
              result.response.question_1.q
            }","${result.response.question_1.a}"\n${sanitize_string(
              international_timezone_formatter(result.created_at)
            )},${result.quarter},"${result.response.question_2.question_id}","${
              result.response.question_2.q
            }","${result.response.question_2.a}"\n`
        )
        .join("")
        .trim();

      const file = {
        columns,
        csv_data: data,
        file_name,
        file_path,
      };

      const meta_data = {
        uploaded_file_name: `survey_results_${formatted_date}`,
        alt_text: "A file containing the survey results",
        channel_id: channels.admin,
        comment: "Here is a file containing the survey results",
      };

      const upload = await upload_csv_to_slack(file, meta_data);

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          nemo_survey: {
            user_id,
            user_name: body.user_name,
            status: "file uploaded",
            file: upload.status,
          },
        },
      ]);
    } catch (error) {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_nemo_survey: {
            user_id: body.user_id,
            user_name: body.user_name,
            status: "file failed to upload",
            error: error,
          },
        },
      ]);
    }
  });
};
