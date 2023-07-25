import type { day } from "../types/projectTypes.ts";
import {
  generate_thoughtful_thursdays_post,
  generate_wonder_wednesday_post,
} from "../helpers/generate_message.ts";
import {
  determine_next_day_function,
  determine_next_execute_date_freq,
} from "./custom-date-fns.ts";

const convert_epoch_date_to_iso_date = (epoch_date: number) => {
  const string_date = new Date(epoch_date * 1000).toISOString();

  return new Date(string_date);
};

export const generate_scheduled_messages = (
  lst_messages: string[],
  channel: string,
  start_date: Date,
  repeat_day: day,
  frequency: number
) => {
  // Given a start date let's calculate next thursday
  // do this iteratively for the length of the list of words

  const new_array: {
    channel: string;
    post_at: number;
    text: string;
  }[] = [];

  const next_day_function = determine_next_day_function(repeat_day);

  lst_messages.forEach((message) => {
    const begin_date = next_day_function(start_date);

    const following_day = convert_epoch_date_to_iso_date(
      new_array[new_array.length - 1]?.post_at ?? begin_date.getTime() / 1000
    );

    const next_execute_date = determine_next_execute_date_freq(
      following_day,
      repeat_day,
      frequency
    );

    const post_of_the_week =
      repeat_day === "wednesday"
        ? generate_wonder_wednesday_post(message, 3)
        : generate_thoughtful_thursdays_post(message, 1);

    new_array.push({
      channel,
      text: post_of_the_week,
      post_at: next_execute_date.getTime() / 1000,
    });
  });

  return new_array;
};
