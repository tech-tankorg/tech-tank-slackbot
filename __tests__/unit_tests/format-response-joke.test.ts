import type {
  singleJoke,
  twoPartJoke,
} from "../../utils/types/projectTypes.ts";

import { format_response_jokes } from "../../utils/helpers/format-response-jokes.ts";

let joke: singleJoke | twoPartJoke;

describe("Check for correctly formatted joke response. This is going to depend on whether single or two-part joke is received", () => {
  beforeAll(() => {
    joke = {
      error: false,
      category: "string",
      type: "string",
      joke: "string",
      flags: {
        nsfw: false,
        religious: false,
        political: false,
        racist: false,
        sexist: false,
        explicit: false,
      },
      id: 23,
      safe: false,
      lang: "string",
    };

    return joke;
  });
  it("should return an object where the blocks does not exist", () => {
    const result = format_response_jokes("single", joke);

    expect(result?.blocks).not.toBeDefined();
  });
});
