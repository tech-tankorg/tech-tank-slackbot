import type {
  JokeType,
  response_type,
  singleJoke,
  twoPartJoke,
} from "../types/projectTypes.d.ts";

const isTwoPartJoke = (
  type: JokeType,
  joke: singleJoke | twoPartJoke
): joke is twoPartJoke => {
  return "setup" in joke && type === "twopart";
};

export const format_response_jokes = (
  type: JokeType,
  joke: singleJoke | twoPartJoke
) => {
  if (isTwoPartJoke(type, joke)) {
    return {
      response_type: "in_channel" as response_type,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: joke.setup,
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: joke.delivery,
          },
        },
      ],
    };
  }
  return {
    response_type: "in_channel" as response_type,
    text: joke.joke,
  };
};
