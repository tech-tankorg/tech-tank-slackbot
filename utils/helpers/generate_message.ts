import { admins, channels } from "../config/channel-config.ts";
import type { db_thanks_no_reciever } from "../types/projectTypes.ts";

export const generate_welcome_message = () => {
  const greeting = `
Welcome to the Tank (aka Tech Tank :tech-tank:)! We're so happy you're here:blue_heart:

This is a space for all techies (devs, designers, PMs and beyond) from newbies/juniors to senior level, and we hope you can make some meaningful connections here.

When you've had a moment to settle in, don't forget to head over to the <#${channels.intro}> channel to introduce yourself!

Afterwards, you can check out some of our other channels. Here's a list of our currently active channels you should consider joining:

• <#${channels.announcements}>: this is where we post all our important announcements for you to stay updated!

• <#${channels.networking}>: this is where we post all in-person and virtual networking/job-related events! We also have in-house virtual workshops that cover most job-search topics!

• <#${channels.social}>: we hang out a lot. We go climbing, play boardgames, for drinks/food, and many more! (Most of us are in Toronto - sorry if you're elsewhere :sob:)

• <#${channels.study}>: this is where we post information about study sessions (biweekly on Tuesdays) and you can ask any questions about code/study material/projects you're stuck on or need help debugging!

• <#${channels.job_posting}>: this is where we post jobs that we come across. For any job-search/job-prep related questions, we have a channel for that too... right below :)

• <#${channels.job_prep}>: A space that supports job-preppers through: resume/portfolio feedback, interview prep (including technical assessments), and mock interviews sessions!

• <#${channels.random}>: just random stuff. no further explanation needed :stuck_out_tongue_winking_eye:

• <#${channels.rant_tank}>: a space to rant or complain about anything and everything:purple_heart:

• <#${channels.resources}>: post any notes/cool resources you come across!

• <#${channels.project_proposals}>: Do you have a cool project idea and need some team members? Do you want to join a project? If yes, then this is the place that allows you to share, create, and join projects!

• <#${channels.coffee_chat}>: This is where you go to join in on the social mixer for our Slack community!! Every other week (Mondays at 10 AM EST), Shuffl -- the master of pairs and groups -- works its magic to shuffle you into fresh groups of three via direct messages!

And of course, if you don't see an appropriate place to post, you can always just post in #general! We would also love to hear your ideas! So at anytime, feel free to use the "/suggestion" command to send your idea's directly to the admin team. 

If you want to stay updated with all our events, feel free to subscribe to our public calendar using one of the following links <https://calendar.google.com/calendar/embed?src=cfda7c6ac8ce0fc9eaf3acb92419608d7c3cc9bcf3ed49b5f7c7d8a1058f697c%40group.calendar.google.com&ctz=America%2FToronto|generic calendar link> or <https://calendar.google.com/calendar/ical/cfda7c6ac8ce0fc9eaf3acb92419608d7c3cc9bcf3ed49b5f7c7d8a1058f697c%40group.calendar.google.com/public/basic.ics|calendar link for apple devices>. Lastly, we wanted to provide you a link to our code of conduct which you can find <https://www.techtankto.com/code-of-conduct|here>.

If you have any questions or concerns at any time, please don't hesitate to contact <@${admins.chris}>, <@${admins.sammy}>, <@${admins.nonso}>, <@${admins.niya}>, <@${admins.riaz}>, <@${admins.neal}>, or <@${admins.eric}> your friendly admins:party_blob:

Thanks for reading, and we hope you have a good swim :fish:
`;
  return greeting;
};

export const generate_thoughtful_thursdays_post = (
  question_of_the_week: string,
  random_number: number
) => {
  if (random_number === 1)
    return `:tropical_fish: Hey there, it's your favourite neighbourhood fishy, Nemo, swimming your way! :ocean::tropical_fish:

You know, I've always been a curious little fish, and this week, I've got a burning question that's been tickling my fins. :thinking_face::sparkles: So, without further ado, let's dive into a lively thread and uncover the juicy thoughts swimming around Tech Tank!

:speech_balloon: Here's the question/post of the week: *${question_of_the_week}* :thinking_face:`;

  if (random_number === 2)
    return `:ocean::tropical_fish: Well, well, well... Look who's making a splash in your feeds! It's Nemo, your friendly underwater explorer, swimming in with a question that's been bobbling around my bubbly brain. Care to join me in a lively discussion this week? Let's dive right in and make some waves in the Tech Tank community! :speech_balloon::sparkles:
    
    :speech_balloon: Here's the question/post of the week: *${question_of_the_week}* :thinking_face:`;

  if (random_number === 3)
    return `:ocean::tropical_fish: Ahoy, Tech Tankers! Nemo, your trusty underwater companion, has surfaced with a question that's sure to make a splash. Let's cast our nets of discussion wide and reel in some fascinating insights from our brilliant members!:speech_balloon::sparkles:
    
     :speech_balloon: Here's the question/post of the week: *${question_of_the_week}* :thinking_face:`;

  if (random_number === 4)
    return `:ocean::tropical_fish: Hold on to your sea shells, Tech Tankers! It's Nemo, your favourite neighbourhood fishy, swimming your way with a question that will make your synapses sizzle. Are you prepared for the deep dive into the uncharted waters of this weeks question? Let's unravel the mysteries, share our most dazzling insights, and make some waves together! :thinking_face::speech_balloon:
  
  :speech_balloon: Here's the question/post of the week: *${question_of_the_week}* :thinking_face:
  `;

  return `Start a thread with the following: *${question_of_the_week}* :thread:`;
};

export const generate_wonder_wednesday_post = (
  question_of_the_week: string,
  random_number: number
) => {
  if (random_number === 1)
    return `:tropical_fish: Hey there, it's your favourite neighbourhood fishy, Nemo, swimming your way! :ocean::tropical_fish:

You know, I've always been a curious little fish, and this week, I've got a burning question that's been tickling my fins. :thinking_face::sparkles: So, without further ado, let's dive into a lively thread and uncover the juicy thoughts swimming around Tech Tank!

:speech_balloon: Here's the question/post of the week: *I wonder ${question_of_the_week}* :thinking_face:`;

  if (random_number === 2)
    return `:ocean::tropical_fish: Well, well, well... Look who's making a splash in your feeds! It's Nemo, your friendly underwater explorer, swimming in with a question that's been bobbling around my bubbly brain. Care to join me in a lively discussion this week? Let's dive right in and make some waves in the Tech Tank community! :speech_balloon::sparkles:
    
    :speech_balloon: Here's the question/post of the week: *I wonder ${question_of_the_week}* :thinking_face:`;

  if (random_number === 3)
    return `:ocean::tropical_fish: Ahoy, Tech Tankers! Nemo, your trusty underwater companion, has surfaced with a question that's sure to make a splash. Let's cast our nets of discussion wide and reel in some fascinating insights from our brilliant members!:speech_balloon::sparkles:
    
     :speech_balloon: Here's the question/post of the week: *I wonder ${question_of_the_week}* :thinking_face:`;

  if (random_number === 4)
    return `:ocean::tropical_fish: Hold on to your sea shells, Tech Tankers! It's Nemo, your favourite neighbourhood fishy, swimming your way with a question that will make your synapses sizzle. Are you prepared for the deep dive into the uncharted waters of this weeks question? Let's unravel the mysteries, share our most dazzling insights, and make some waves together! :thinking_face::speech_balloon:
  
  :speech_balloon: Here's the question/post of the week: *I wonder ${question_of_the_week}* :thinking_face:
  `;

  return `Start a thread!! I wonder: *${question_of_the_week}* :thread:`;
};

export const generate_suggestion_notification_message = (
  user_id: string,
  suggestion: string
) => {
  return {
    mrkdwn: true,
    text: `A new suggestion has been submitted by <@${user_id}>! *Suggestion*: ${suggestion}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `A new suggestion has been submitted`,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Community member*: <@${user_id}>`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Suggestion*: ${suggestion}`,
        },
      },
    ],
  };
};

export const generate_admin_notification_message = (
  user_id: string,
  message: string
) => {
  return {
    mrkdwn: true,
    text: `A new message using the /notify-admins command has been submitted by <@${user_id}>. \n\n*Message*: ${message}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `A new message using the /notify-admins command has been submitted!`,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Community member*: <@${user_id}>`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Message*: ${message}`,
        },
      },
    ],
  };
};

export const generate_mentor_message = () => {
  const mentor_message = `Hey, how is your mentee/s doing? How are the meetings and progress?`;
  return mentor_message;
};

export const generate_mentee_message = () => {
  const mentee_message = `Hey, how is your mentorship going? How are the meetings and progress?`;
  return mentee_message;
};

export const generate_thanks_message = (
  msg: db_thanks_no_reciever[],
  user: string
) => {
  const part_two_msg = msg.map((item) => {
    return `<@${item.user_id_sender}>: ${item.message}`;
  });

  return `Hey <@${user}>! Thank you for being awesome! Here's what community members had to say: \n\n${part_two_msg.join(
    "\n"
  )}`;
};
