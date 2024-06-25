import { format, startOfMonth } from "date-fns";
import { get_upcoming_events_for_the_month } from "../../service/google-calendar.ts";
import { generate_sanity_newsletter } from "../../service/sanity-client.ts";
import type {
  google_cal_event,
  sanity_fyi_block,
  sanity_letter_info,
  transform_Block_img_type,
  transform_block_type,
} from "../../types/projectTypes.ts";

import {
  GOOGLE_API_KEY,
  GOOGLE_CALENDAR_ID,
  TECHTANK_EVENT_TAG,
} from "../../constants/consts.ts";

import { international_timezone_formatter } from "../date/custom-date-fns.ts";

import { generate_sanity_img_url } from "../../config/sanity-config.ts";

import { find_web_address } from "../calendar/find-web-address.ts";

const transform_to_block = (section: sanity_letter_info) => {
  const temp_array: Array<transform_block_type | transform_Block_img_type> = [];
  for (const item of section) {
    if (item.images === null) {
      temp_array.push({
        type: "section",
        text: {
          text: `--- \n\n*${item.title}*\n\n${item.description} \n \n`,
          type: "mrkdwn",
        },
      });
    } else {
      const img_caption = item.images.caption ?? "";
      const img_url = generate_sanity_img_url(item.images);
      temp_array.push({
        type: "section",
        text: {
          text: `--- \n\n*${item.title}*\n\n${item.description} \n \n`,
          type: "mrkdwn",
        },
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
        text: `--- \n\n*${sec.title}*\n\n${sec.description} \n \n`,
        type: "mrkdwn",
      },
    };
  });
};

const transform_to_block_upcoming_events = (section: google_cal_event) => {
  const tech_tank_events = section.filter(
    (event) => !event.summary.includes(TECHTANK_EVENT_TAG)
  );

  return tech_tank_events.map((sec) => {
    const web_address = find_web_address(sec.description) ?? "#";

    const start_date_time = new Date(sec.start.dateTime);

    const start_date_time_formatted =
      international_timezone_formatter(start_date_time);

    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `\n* ${start_date_time_formatted} | <${web_address}|${sec.summary}>* @ ${sec.location}`,
      },
    };
  });
};

const transform_to_block_upcoming_events_techtank = (
  section: google_cal_event
) => {
  const tech_tank_events = section.filter((event) =>
    event.summary.includes(TECHTANK_EVENT_TAG)
  );

  return tech_tank_events.map((sec) => {
    const web_address = find_web_address(sec.description) ?? "#";

    const start_date_time = new Date(sec.start.dateTime);
    const start_date_time_formatted =
      international_timezone_formatter(start_date_time);

    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `\n* ${start_date_time_formatted} | <${web_address}|${sec.summary}>* @ ${sec.location}`,
      },
    };
  });
};

const generate_community_member_section = (community_highlight: {
  community_member_name: string;
  community_member_description: string;
}) => {
  if (!community_highlight) return [];

  return [
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*COMMUNITY MEMBER HIGHLIGHTS* :star2:",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*This months community member highlight goes to ${community_highlight.community_member_name}*!! :tada::tada:`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${community_highlight.community_member_description} \n\n`,
      },
    },
  ];
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
      response[0].letter_tech_insights ?? { title: "", description: "" }
    );
    const transform_block_info = transform_to_block(response[0].letter_info);

    const transform_block_upcoming_events = transform_to_block_upcoming_events(
      response[1]
    );

    const transform_block_upcoming_events_techtank =
      transform_to_block_upcoming_events_techtank(response[1]);

    const community_member_section = generate_community_member_section(
      response[0].letter_member_highlight
    );

    return [
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
      ...community_member_section,
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
          text: ":spiral_calendar_pad: |   *UPCOMING TechTank EVENTS*  | :spiral_calendar_pad: ",
        },
      },
      ...transform_block_upcoming_events_techtank,
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
    ];
  } catch (e) {
    console.error(e);
    return [
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
          text: "*Sorry! No newsletter this month!*",
        },
      },
    ];
  }
};

export const generate_newsletter_post = async () => {
  const start_of_month = startOfMonth(new Date());

  const formatted_date = format(start_of_month, "MMMM yyyy");

  const request_format_date = format(start_of_month, "yyyy-MM-dd");

  try {
    const response = await generate_sanity_newsletter(request_format_date);

    const transform_block_fyi = transform_to_block_fyi(response.letter_fyi);
    const transform_block_tech_insights = transform_to_block_fyi(
      response.letter_tech_insights ?? { title: "", description: "" }
    );
    const transform_block_info = transform_to_block(response.letter_info);

    const community_member_section = generate_community_member_section(
      response.letter_member_highlight
    );

    return [
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
      ...community_member_section,
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
    ];
  } catch {
    return [
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
          text: "*Sorry! No newsletter this month!*",
        },
      },
    ];
  }
};
