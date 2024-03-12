# Tech tank Slack App 🤖🚀

We're excited to announce the creation of a powerful tool designed to enhance communication within our vibrant Slack community. The Tech Tank Slack Bot is here to streamline various aspects of our community interactions, making it easier than ever to connect, collaborate, and engage with fellow members. 💙

The Tech Tank Slack Bot is open to limitless possibilities. We encourage you to dream big and suggest the next innovative feature you'd like to see added. Together, we can shape the future functionality of the bot, making it an indispensable tool for our community.

While write access to this repository is restricted, we have made sure that you have read access, allowing you to explore the code, fork the repository, work on your own enhancements, and contribute by creating a pull request. This collaborative approach ensures that our bot continually evolves, driven by the collective creativity and expertise of our members.

## Development

After you've forked and cloned the repo on to your local machine, go to the project directory and install the dependencies.

```bash
cd tech-tank-slackbot && npm install
```

Add your `SLACK CREDENTIALS` to a `.env` file -- use the `.env.example` to reference which environment variables you need to add.

To start the local server on the port specified in the `.env`:

```bash
npm run dev
```

We've added a docker file to this project so that you can spin up a production ready instance on your local machine. With a docker engine and [docker](https://www.docker.com/products/docker-desktop/) installed, run the following command:

```bash
docker-compose up
```

## Access test environment workspace

Contact admins to receive the `env` variables and to be added to the test environment workspace.

## Setup a your own test slack app/bot (optional)

1. Create a test slack workspace
2. Navigate over to [slack's api](https://api.slack.com/apps)
3. Create a new App
4. Choose create from an app manifest
5. Select the workspace you want to install the new app
6. Copy the App manifest from the `manifest.json` into the JSON editor
7. Create the App
8. Install the bot to the workspace
9. Copy the following keys:
   - Client Secret
   - Signing Secret
   - App token (only copy this if you are using socket mode)

## Usage/Examples

The following is an example demonstrating how to add new event listeners to the slack app.

```typescript
// "./Events/newEvent.ts"

import app from "../../utils/config/slack-config.ts";

export const newEvent = () => {
  app.event("type_of_event", () => {
    //do some interesting stuff...
  });
};
```

```typescript
// "./index.ts"

import app from "../utils/config/slack-config.ts";
import { greet_new_team_member } from "./Events/greetings.ts";
import { newEvent } from "./Events/newEvent.ts";
import { sayHello } from "./Events/sayHello.ts";

greet_new_team_member();
sayHello();
newEvent();

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
```

## Contributing

---

Contributions are always welcome!

See `contributing.md` for ways to get started.

## License

[MIT](/LICENSE)
