export const admins = {
  chris: process.env.ADMIN_CHANNEL_ID_CHRIS ?? "",
  sammy: process.env.ADMIN_CHANNEL_ID_SAMMY ?? "",
  eric: process.env.ADMIN_CHANNEL_ID_ERIC ?? "",
  johann: process.env.ADMIN_CHANNEL_ID_JOHANN ?? "",
  nonso: process.env.ADMIN_CHANNEL_ID_NONSO ?? "",
} as const;

export const channels = {
  intro: process.env.MAIN_CHANNEL_ID_INTRO ?? "",
  networking: process.env.MAIN_CHANNEL_ID_NETWORKING ?? "",
  social: process.env.MAIN_CHANNEL_ID_SOCIAL ?? "",
  study: process.env.MAIN_CHANNEL_ID_STUDY ?? "",
  jobs: process.env.MAIN_CHANNEL_ID_JOBS ?? "",
  random: process.env.MAIN_CHANNEL_ID_RANDOM ?? "",
  ugh: process.env.MAIN_CHANNEL_ID_UGH ?? "",
  resources: process.env.MAIN_CHANNEL_ID_RESOURCES ?? "",
  project_proposals: process.env.MAIN_CHANNEL_ID_PROJECT_PROPOSAL ?? "",
} as const;
