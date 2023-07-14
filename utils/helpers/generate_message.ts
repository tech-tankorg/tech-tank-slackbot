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
<@${admins.chris}>, <@${admins.eric}>, <@${admins.sammy}> or <@${admins.nonso}> your friendly admins:party_blob:

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

export const generate_notification_message = (
  user_name: string,
  suggestion: string,
  tag: string
) => {
  return {
    mrkdwn: true,
    text: `New suggestion has been submitted \n\n ${user_name} submitted a suggestion with the tag of ${tag}\n\n *Suggestion*: ${suggestion}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "New suggestion has been submitted",
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${user_name} submitted a suggestion with the tag of ${tag}`,
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
