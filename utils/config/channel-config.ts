export const admins = {
  chris: "U04DDM4LQAD",
  sammy: "U04SKSY6K1C",
  eric: "U053Y4S16TE",
  nonso: "U0586TY9NP2",
  niya: "U0555M9GTJS",
  riaz: "U0550E9JAUX",
  neal: "U0556267TN2",
} as const;

export const channels = {
  intro: "C052KD3ELTH",
  networking: "C057LAEN8DP",
  social: "C04UA2H8ARG",
  study: "C04S75JBKPA",
  jobs: "C04J7CPHVMW",
  random: "C04CTH78SEA",
  ugh: "C052W5AU9BM",
  resources: "C04U5MWEXP1",
  project_proposals: "C05DVA1HX9U",
  general: "C04DCQ64VB3",
  coffee_chat: "C05G1S5HB4Z",
  mentee: "C05H6HJDEQM",
  mentor: "C05H67NDYQ4",
  notification: process.env.SLACK_NOTIFICATION_CHANNEL ?? "",
} as const;
