import type { JokeType, response_type } from "../types/projectTypes.d.ts";

export const format_response_jokes = (type: JokeType, Joke: any) => {
  if (type === "twopart") {
    return {
      response_type: "in_channel" as response_type,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: Joke.setup as string,
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: Joke.delivery as string,
          },
        },
      ],
    };
  }

  return {
    response_type: "in_channel" as response_type,
    text: Joke.joke as string,
  };
};
