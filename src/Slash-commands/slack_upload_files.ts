import app from "../../utils/config/slack-config.ts";
import { get_survey_results } from "../../utils/controllers/survey-controller.ts";
import { writeFile } from "../../lib/node_files/index.ts";

import { randomBytes } from "node:crypto";
import { survey_results_schema } from "../../utils/types/zod-types.ts";

import { international_timezone_formatter } from "../../utils/helpers/custom-date-fns.ts";

import { is_admin } from "../../utils/helpers/feat-flag.ts";

import path from "node:path";

import { format } from "date-fns";

import { unlinkSync, existsSync } from "node:fs";

import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { channels } from "../../utils/config/channel-config.ts";

const generate_values = (value = 16) => {
  return randomBytes(value).toString("hex");
};

const sanitize_string = (str: string) => {
  return str.replace(/,/g, "");
};

const writeCSV = (data: string, file_name: string) => {
  const cwd = process.cwd();
  writeFile({ file_name, file_path: cwd, file_type: "csv", data });
};

const create_file = async (file_name: string) => {
  const results_pre = await get_survey_results();
  const results = survey_results_schema.parse(results_pre);

  const columns =
    "created_at, quarter, question_1, answer_1, question_2, answer_2\n";

  const mapped_value = results.map(
    (result) =>
      `${sanitize_string(
        international_timezone_formatter(result.created_at)
      )}, ${result.quarter}, ${sanitize_string(
        result.response.question_1.q
      )}, ${sanitize_string(result.response.question_1.a)}, ${sanitize_string(
        result.response.question_2.q
      )}, ${sanitize_string(result.response.question_2.a)}\n`
  );
  const data_csv = columns + mapped_value.join();

  writeCSV(data_csv, file_name);
};

export const download_survey_results = () => {
  app.command("/survey-results", async ({ ack, body, client, respond }) => {
    await ack();
    const user_id = body.user_id;
    let complete_filepath = "";

    const is_allowed = is_admin(user_id);
    if (!is_allowed) {
      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          admin_commands: {
            user_id: body.user.id,
            user_name: body.user.name,
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
      const file_name = `temp-${generate_values()}`;
      await create_file(file_name);

      const cwd = process.cwd();
      const filename = `${file_name}.csv`;
      complete_filepath = path.join(cwd, filename);

      const today = new Date();
      const formatted_date = format(today, "MM_dd_yyyy");

      const upload = await client.files.uploadV2({
        file_uploads: [
          {
            filename: `survey_results_${formatted_date}.csv`,
            alt_text: "A file containing the survey results",
            file: complete_filepath,
          },
        ],
        channel_id: channels.admin,
        initial_comment: "Here is a file containing the survey results",
      });

      if (upload.ok || !upload.ok) {
        unlinkSync(complete_filepath);
      }

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          nemo_survey: {
            user_id: body.user.id,
            user_name: body.user.name,
            status: "file uploaded",
            file: upload.ok,
          },
        },
      ]);
    } catch (error) {
      if (existsSync(complete_filepath)) unlinkSync(complete_filepath);

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_nemo_survey: {
            user_id: body.user.id,
            user_name: body.user.name,
            status: "file failed to upload",
            error: error,
          },
        },
      ]);
    }
  });
};
