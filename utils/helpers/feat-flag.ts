import { admins } from "../../utils/config/channel-config.ts";

export const is_admin = (user_id: string) => {
  const admins_id = Object.values(admins) as string[];

  if (admins_id.includes(user_id) || user_id === "U05BYP96Q6B") return true;

  return false;
};
