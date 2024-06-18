import fs from "node:fs";

export const writeFile = (data: string) => {
  const path = process.cwd();

  fs.writeFileSync(`${path}/users.txt`, data);
};
