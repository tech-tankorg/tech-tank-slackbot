import type {
  JokeType,
  response_type,
  singleJoke,
  twoPartJoke,
} from "../types/projectTypes.d.ts";

export const format_response_jokes = (
  type: JokeType,
  joke: singleJoke | twoPartJoke
) => {
  if (type === "twopart" && "setup" in joke) {
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
  } else if (type === "single" && "joke" in joke) {
    return {
      response_type: "in_channel" as response_type,
      text: joke.joke,
    };
  }
};
