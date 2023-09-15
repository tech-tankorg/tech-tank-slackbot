import { z } from "zod";
import { channels } from "../config/channel-config.ts";
import { THANKS_CHANNEL_MESSAGE_VALIDATION_REGEX } from "../constants/consts.ts";

export const joke_category = z.union([
  z.literal("programming"),
  z.literal("pun"),
  z.literal("spooky"),
]);

export const sanity_letter_section = z.object({
  letter_fyi: z.array(z.object({ title: z.string(), description: z.string() })),
  letter_info: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      images: z.nullable(
        z.object({
          _type: z.string(),
          asset: z.object({ _ref: z.string(), _type: z.string() }),
          caption: z.optional(z.string()),
        })
      ),
    })
  ),
  letter_title: z.string(),
  letter_description: z.string(),
  scheduled_post_date: z.string(),
});

export const welcomes_type = z.object({
  users: z.array(z.string()),
  time_stamp: z.object({ seconds: z.number(), nanoseconds: z.number() }),
});

export const shoutout_message_user_text_validation = z
  .string()
  .startsWith("!thanks")
  .regex(THANKS_CHANNEL_MESSAGE_VALIDATION_REGEX)
  .or(
    z
      .string()
      .startsWith("!shoutout")
      .regex(THANKS_CHANNEL_MESSAGE_VALIDATION_REGEX)
  );

export const shoutout_message_channel_validation = z
  .string()
  .includes(channels.thanks);
