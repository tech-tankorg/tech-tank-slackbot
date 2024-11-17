import { existsSync, unlinkSync } from "node:fs";
import path from "node:path";
import app from "../../utils/config/slack-config.ts";
import { writeFile } from "../node_files/index.ts";

interface File {
  file_name: string;
  file_path: string;
  columns: string;
  csv_data: string;
}

interface MetaData {
  uploaded_file_name: string;
  channel_id: string;
  comment: string;
  alt_text: string;
}

const write_csv_file = (file: File) => {
  const data = file.columns + file.csv_data;

  writeFile({
    file_name: file.file_name,
    file_path: file.file_path,
    file_type: "csv",
    data,
  });
};

/**
 * Creates a temp csv file on disk, uploads it to slack, and then deletes the temp file.
 * @param file
 * @param meta_data
 */

export const upload_csv_to_slack = async (file: File, meta_data: MetaData) => {
  write_csv_file(file);

  const complete_file_path = path.join(file.file_path, `${file.file_name}.csv`);

  try {
    const upload = await app.client.files.uploadV2({
      file_uploads: [
        {
          filename: `${meta_data.uploaded_file_name}.csv`,
          alt_text: meta_data.alt_text,
          file: complete_file_path,
        },
      ],
      channel_id: meta_data.channel_id,
      initial_comment: meta_data.comment,
    });

    if (upload.ok || !upload.ok) {
      unlinkSync(complete_file_path);
    }

    return { status: upload.ok, error: null };
  } catch (error) {
    if (existsSync(complete_file_path)) unlinkSync(complete_file_path);
    return { status: false, error };
  }
};
