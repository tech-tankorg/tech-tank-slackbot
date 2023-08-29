import { format, startOfMonth } from "date-fns";
import type {
  sanity_letter_info,
  sanity_fyi_block,
  google_cal_event,
  transform_block_type,
  transform_Block_img_type,
} from "../types/projectTypes.ts";
import { get_upcoming_events_for_the_month } from "../service/google-calendar.ts";
import { generate_sanity_newsletter } from "../service/sanity-client.ts";

import { GOOGLE_CALENDAR_ID, GOOGLE_API_KEY } from "../constants/consts.ts";

import { generate_sanity_img_url } from "../config/sanity-config.ts";

import { find_web_address } from "./find-web-address.ts";

const transform_to_block = (section: sanity_letter_info) => {
  const temp_array: Array<transform_block_type | transform_Block_img_type> = [];
  for (const item of section) {
    if (item.images === null) {
      temp_array.push({
        type: "section",
        text: {
          text: "---",
          type: "mrkdwn",
        },
        fields: [
          {
            type: "mrkdwn",
            text: `${item.title}\n\n ${item.description} \n \n`,
          },
        ],
      });
    } else {
      const img_caption = item.images.caption ?? "";
      const img_url = generate_sanity_img_url(item.images);
      temp_array.push({
        type: "section",
        text: {
          text: "---",
          type: "mrkdwn",
        },
        fields: [
          {
            type: "mrkdwn",
            text: `${item.title}\n\n ${item.description} \n \n`,
          },
        ],
      });

      temp_array.push({
        type: "image",
        title: {
          type: "plain_text",
          text: img_caption,
          emoji: true,
        },
        image_url: img_url,
        alt_text: img_caption,
      });
    }
  }
  return temp_array;
};

const transform_to_block_fyi = (section: sanity_fyi_block[]) => {
  return section.map((sec) => {
    return {
      type: "section",
      text: {
        text: "---",
        type: "mrkdwn",
      },
      fields: [
        {
          type: "mrkdwn",
          text: `${sec.title}\n\n ${sec.description} \n \n`,
        },
      ],
    };
  });
};

const transform_to_block_upcoming_events = (section: google_cal_event[]) => {
  return section.map((sec) => {
    const web_address = find_web_address(sec.description) ?? "#";

    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `\n*${format(new Date(sec.start.dateTime), "MMM do")} - ${format(
          new Date(sec.start.dateTime),
          "p"
        )} | <${web_address}|${sec.summary}>* @ ${sec.location}`,
      },
    };
  });
};

export const generate_newsletter = async () => {
  const start_of_month = startOfMonth(new Date());
  const formatted_date = format(start_of_month, "MMMM yyyy");

  const request_format_date = format(start_of_month, "yyyy-MM-dd");

  try {
    const response = await Promise.all([
      generate_sanity_newsletter(request_format_date),
      get_upcoming_events_for_the_month(GOOGLE_CALENDAR_ID, GOOGLE_API_KEY),
    ]);

    const transform_block_fyi = transform_to_block_fyi(response[0].letter_fyi);
    const transform_block_tech_insights = transform_to_block_fyi(
      response[0].letter_tech_insights
    );
    const transform_block_info = transform_to_block(response[0].letter_info);

    const transform_block_upcoming_events = transform_to_block_upcoming_events(
      response[1]
    );

    const community_highlight_member_name = response[0].letter_member_highlight
      .community_member_name as string;
    const community_highlight_member_description = response[0]
      .letter_member_highlight.community_member_description as string;

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
          type: "header",
          text: {
            type: "plain_text",
            text: ":page_facing_up: Tech Tank Code of Conduct",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Please read and acknowledge*",
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: ":page_facing_up: Open COC",
              emoji: true,
            },
            value: "open_COC",
            action_id: "open_coc_modal",
          },
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
            text: ":spiral_calendar_pad: |   *UPCOMING EVENTS*  | :spiral_calendar_pad: ",
          },
        },
        ...transform_block_upcoming_events,
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*COMMUNITY MEMBER HIGHLIGHTS* :star2:\n ---",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `This months community member highlight goes to *${community_highlight_member_name}*!! :tada::tada:`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: community_highlight_member_description,
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*TECH INSIGHTS* :newspaper:",
          },
        },
        ...transform_block_tech_insights,
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
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: ":pushpin: Your monthly newsletter brought to you by *Nemo* from *Tech Tank*.",
            },
          ],
        },
      ],
    };
  } catch {
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
            text: "*Sorry! No newsletter this month!*",
          },
        },
      ],
    };
  }
};
