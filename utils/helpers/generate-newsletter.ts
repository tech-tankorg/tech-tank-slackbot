import { addHours, startOfMonth } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import type {
  sanity_letter_info,
  sanity_fyi_block,
  google_cal_event,
  transform_block_type,
  transform_Block_img_type,
} from "../types/projectTypes.ts";
import { get_upcoming_events_for_the_month } from "../service/google-calendar.ts";
import { generate_sanity_newsletter } from "../service/sanity-client.ts";

import {
  GOOGLE_CALENDAR_ID,
  GOOGLE_API_KEY,
  TORONTO_TIME_ZONE_IDENTIFIER,
  TECHTANK_EVENT_TAG,
} from "../constants/consts.ts";

import { generate_sanity_img_url } from "../config/sanity-config.ts";

import { find_web_address } from "./find-web-address.ts";

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

const transform_to_block_upcoming_events = (section: google_cal_event[]) => {
  const tech_tank_events = section.filter(
    (event) => !event.description.includes(TECHTANK_EVENT_TAG)
  );

  return tech_tank_events.map((sec) => {
    const web_address = find_web_address(sec.description) ?? "#";

    const start_date_time = new Date(sec.start.dateTime);
    const start_date_time_formatted = formatInTimeZone(
      start_date_time,
      TORONTO_TIME_ZONE_IDENTIFIER,
      "MMM do - p"
    );

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
  section: google_cal_event[]
) => {
  const tech_tank_events = section.filter((event) =>
    event.description.includes(TECHTANK_EVENT_TAG)
  );

  return tech_tank_events.map((sec) => {
    const web_address = find_web_address(sec.description) ?? "#";

    const start_date_time = new Date(sec.start.dateTime);
    const start_date_time_formatted = formatInTimeZone(
      start_date_time,
      TORONTO_TIME_ZONE_IDENTIFIER,
      "MMM do - p"
    );

    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `\n* ${start_date_time_formatted} | <${web_address}|${sec.summary}>* @ ${sec.location}`,
      },
    };
  });
};

export const generate_newsletter = async () => {
  const start_of_month = startOfMonth(new Date());
  const start_of_month_adjusted_time = addHours(start_of_month, 4);

  const formatted_date = formatInTimeZone(
    start_of_month_adjusted_time,
    TORONTO_TIME_ZONE_IDENTIFIER,
    "MMMM yyyy"
  );

  const request_format_date = formatInTimeZone(
    start_of_month_adjusted_time,
    TORONTO_TIME_ZONE_IDENTIFIER,
    "yyyy-MM-dd"
  );

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
            text: "*COMMUNITY MEMBER HIGHLIGHTS* :star2:",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*This months community member highlight goes to ${community_highlight_member_name}*!! :tada::tada:`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${community_highlight_member_description} \n\n`,
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
      ],
    };
  }
};
