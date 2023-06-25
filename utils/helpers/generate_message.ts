import { admins, channels } from "../config/channel-config.ts";

export const generate_welcome_message = () => {
  const greeting = `
Welcome to the Tank (aka Tech Tank :tech-tank:)! We're so happy you're here:blue_heart:

This is a space for all techies (devs, designers, PMs and beyond) from newbies/juniors to senior level, and we hope you can make some meaningful connections here.

When you've had a moment to settle in, don't forget to head over to the <#${channels.intro}> channel to introduce yourself!

Afterwards, you can check out some of our other channels. Here's a list of our currently active channels you should consider joining:
• <#${channels.networking}>: this is where we post all in-person and virtual networking/job-related events! We also have in-house virtual workshops that cover most job-search topics!

• <#${channels.social}>: we hang out a lot. We go climbing, play boardgames, for drinks/food, and many more! (Most of us are in Toronto - sorry if you're elsewhere :sob:)

• <#${channels.study}>: this is where we post information about study sessions (biweekly on Tuesdays) and you can ask any questions about code/study material/projects you're stuck on or need help debugging!

• <#${channels.jobs}>: this is where we post jobs that we come across. Feel free to ask any job-related questions here, too!

• <#${channels.random}>: just random stuff. no further explanation needed :stuck_out_tongue_winking_eye:

• <#${channels.ugh}>: a space to rant or complain about anything and everything:purple_heart:

• <#${channels.resources}>: post any notes/cool resources you come across!

• <#${channels.project_proposals}>: Do you have a cool project idea and need some team members? Do you want to join a project? If yes, then this is the place that allows you to share, create, and join projects!

And of course, if you don't see an appropriate place to post, you can always just post in #general! If you have any questions or concerns at any time, please don't hesitate to contact 
<@${admins.chris}>, <@${admins.johann}>, <@${admins.eric}>, <@${admins.sammy}> or <@${admins.nonso}> your friendly admins:party_blob:

Thanks for reading, and we hope you have a good swim :fish:
`;
  return greeting;
};
