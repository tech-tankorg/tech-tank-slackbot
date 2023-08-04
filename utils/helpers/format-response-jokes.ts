import type {
  JokeType,
  response_type,
  singleJoke,
  twoPartJoke,
} from "../types/projectTypes.d.ts";

export const format_response_jokes = (
  type: JokeType,
  Joke: singleJoke | twoPartJoke
) => {
  if (type === "twopart" && "setup" in Joke) {
    return {
      response_type: "in_channel" as response_type,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: Joke.setup,
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: Joke.delivery,
          },
        },
      ],
    };
  } else if (type === "single" && "joke" in Joke) {
    return {
      response_type: "in_channel" as response_type,
      text: Joke.joke,
    };
  }
};
