import { z } from "zod";
import {
  THANKS_CHANNEL_MESSAGE_VALIDATION_REGEX,
  USER_ID_REGEX,
} from "../constants/consts.ts";

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
  .string({ required_error: "" })
  .regex(THANKS_CHANNEL_MESSAGE_VALIDATION_REGEX, {
    message: "The message must only contain one keyword",
  });

export const db_thanks_type = z.object({
  user_id_sender: z.string(),
  message: z.string(),
  user_id_receiver: z.string(),
  date_created: z.object({ seconds: z.number(), nanoseconds: z.number() }),
});

export const create_thanks_usr_name_validation = z
  .string()
  .regex(USER_ID_REGEX, { message: "Must match SLACK user id: UXXXXXXXXX" });

export const gcal_event = z.array(
  z.object({
    kind: z.string(),
    etag: z.string(),
    id: z.string(),
    status: z.string(),
    htmlLink: z.string(),
    created: z.string(),
    updated: z.string(),
    summary: z.string(),
    description: z.string(),
    location: z.string(),
    creator: z.object({ email: z.string() }),
    organizer: z.object({
      email: z.string(),
      displayName: z.string(),
      self: z.boolean(),
    }),
    start: z.object({ dateTime: z.string(), timeZone: z.string() }),
    end: z.object({ dateTime: z.string(), timeZone: z.string() }),
    iCalUID: z.string(),
    sequence: z.number(),
    eventType: z.string(),
  })
);

export const shuffle_bot_user = z.object({
  user_name: z.string(),
  user_id: z.string(),
  date_joined: z.object({ dateTime: z.string(), timeZone: z.string() }),
  is_active: z.boolean(),
  bio: z.object({
    pronouns: z.string(),
    title: z.string(),
    location: z.string(),
    interests: z.string(),
    intro: z.string(),
  }),
});

export const shuffle_bot_groups = z.object({
  date_created: z.object({ dateTime: z.string(), timeZone: z.string() }),
  groups: z.array(z.array(z.string())),
});
