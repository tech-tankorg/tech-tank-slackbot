import { nextThursday } from "date-fns";
import { generate_thoughtful_thursdays_post } from "../helpers/generate_message.ts";

const convert_epoch_date_to_iso_date = (epoch_date: number) => {
  const string_date = new Date(epoch_date * 1000).toISOString();

  return new Date(string_date);
};

export const generate_scheduled_messages = (
  lst_messages: string[],
  channel: string,
  start_date: Date
) => {
  // Given a start date let's calculate next thursday
  // do this iteratively for the length of the list of words
  const new_array: {
    channel: string;
    post_at: number;
    text: string;
  }[] = [];

  lst_messages.forEach((message) => {
    const begin_date = nextThursday(start_date);

    const following_thrus = convert_epoch_date_to_iso_date(
      new_array[new_array.length - 1]?.post_at ?? begin_date.getTime() / 1000
    );

    const post_of_the_week = generate_thoughtful_thursdays_post(message);

    new_array.push({
      channel,
      text: post_of_the_week,
      post_at: nextThursday(following_thrus).getTime() / 1000,
    });
  });

  return new_array;
};
