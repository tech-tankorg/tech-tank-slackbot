import app from "../config/slack-config.ts";
import { z } from "zod";
import { sanity_letter_section } from "./zod-types.ts";
export type Channel = Record<string, string>;

export type JokeType = "single" | "twopart";

export interface Joke {
  error: boolean;
  category: string;
  type: string;
  joke: string;
  setup: string;
  delivery: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}

export interface ScheduleMessage {
  channel: string;
  post_at: number;
  text: string;
}
export interface ScheduledMessageResponse {
  id?: string;
  channel_id?: string;
  post_at?: number;
  date_created?: number;
  text?: string;
}

export type singleJoke = Omit<Joke, "setup" | "delivery">;
export type twoPartJoke = Omit<Joke, "joke">;
export type response_type = "in_channel" | "ephemeral" | undefined;
export type ChatScheduledMessagesListResponse = Awaited<
  ReturnType<typeof app.client.chat.scheduledMessages.list>
>;

export type day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type sanity_letter_section = z.infer<typeof sanity_letter_section>;

export type sanity_letter_info = sanity_letter_section["letter_info"];

export interface google_cal_event {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location: string;

  creator: {
    email: string;
    self: boolean;
  };

  organizer: {
    email: string;
    self: boolean;
  };

  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };

  iCalUID: string;
  sequence: number;
  eventType: string;
}

export type app_home_view_response = Awaited<
  ReturnType<typeof app.client.views.publish>
>;
