import fs from "node:fs";

interface File {
  file_name: string;
  file_path: string;
  file_type: "csv" | "txt";
  data: string;
}
export const writeFile = (file: File) => {
  fs.writeFileSync(
    `${file.file_path}/${file.file_name}.${file.file_type}`,
    file.data,
    { encoding: "utf-8" }
  );
};
