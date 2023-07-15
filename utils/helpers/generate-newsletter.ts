import { format, startOfMonth } from "date-fns";
import axios from "axios";

const generate_sanity_newsletter = async (date: string) => {
  const encodedURI = encodeURIComponent(
    `*[_type=="letter" && scheduled_post_date=="${date}"]{letter_info[]->{title,description},letter_fyi[]->{title,description},letter_title,letter_description,scheduled_post_date}`
  );
  const API_REQ = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/production?query=${encodedURI}`;
  const req = await axios.get(API_REQ);

  return req.data.result[0];
};

const transform_to_block = (section: any[]) => {
  return section.map((sec: any) => ({
    type: "section",
    text: {
      type: "mrkdwn",
      text: `${sec.title}\n ${sec.description}`,
    },
  }));
};

export const generate_newsletter = async () => {
  const start_of_month = startOfMonth(new Date());
  const formatted_date = format(start_of_month, "MMMM yyyy");

  const request_format_date = format(start_of_month, "yyyy-MM-dd");

  const response = await generate_sanity_newsletter(request_format_date);

  const transform_block_fyi = transform_to_block(response.letter_fyi);
  const transform_block_info = transform_to_block(response.letter_info);

  return {
    mrkdwn: true,
    text: "say hello",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: ":newspaper: Nemo's Monthly Newsletter  :newspaper:",
        },
      },
      {
        type: "context",
        elements: [
          {
            text: formatted_date,
            type: "mrkdwn",
          },
        ],
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: " :loud_sound: *IN CASE YOU MISSED IT* :loud_sound:",
        },
      },

      ...transform_block_info,

      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":calendar: |   *UPCOMING EVENTS*  | :calendar: ",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "`12/06/23` *Snow Valley* ",
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*FOR YOUR INFORMATION* :reminder_ribbon:",
        },
      },
      ...transform_block_fyi,
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Please join me in welcoming our 3 *new hires* to the Paper Company family! \n\n *Robert California*, CEO \n\n *Ryan Howard*, Temp \n\n *Erin Hannon*, Receptionist ",
        },
      },
      {
        type: "divider",
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: ":pushpin: Do you have something to include in the newsletter? Here's *how to submit content*.",
          },
        ],
      },
    ],
  };
};
