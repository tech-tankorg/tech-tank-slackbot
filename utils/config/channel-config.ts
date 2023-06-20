import type { Channel } from "../types/projectTypes.d.ts";

export const admins: Channel = {
  chris: process.env.ADMIN_CHANNEL_ID_CHRIS ?? "",
  sammy: process.env.ADMIN_CHANNEL_ID_SAMMY ?? "",
  eric: process.env.ADMIN_CHANNEL_ID_ERIC ?? "",
  johann: process.env.ADMIN_CHANNEL_ID_JOHANN ?? "",
};

export const channels: Channel = {
  intro: process.env.MAIN_CHANNEL_ID_INTRO ?? "",
  networking: process.env.MAIN_CHANNEL_ID_NETWORKING ?? "",
  social: process.env.MAIN_CHANNEL_ID_SOCIAL ?? "",
  study: process.env.MAIN_CHANNEL_ID_STUDY ?? "",
  jobs: process.env.MAIN_CHANNEL_ID_JOBS ?? "",
  random: process.env.MAIN_CHANNEL_ID_RANDOM ?? "",
  ugh: process.env.MAIN_CHANNEL_ID_UGH ?? "",
  resources: process.env.MAIN_CHANNEL_ID_RESOURCES ?? "",
};
