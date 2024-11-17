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

Start a local instance of the database using `docker compose -f ./compose.dev.yml up mongo` and then sync the prisma schema with the databases schema using `npx prisma db push`. Seed the Database with mock data using `npm run seed:db`.

Start the local server on the port specified in the `.env`:

```bash
npm run dev
```

### Optional

We've added a docker file to this project so that you can spin up a development ready instance on your local machine. With a docker engine and [docker](https://www.docker.com/products/docker-desktop/) installed, run the following command to start the container for the bot and the database:

```bash
docker compose -f ./compose.dev.yml up
```

or use the following command:

```bash
npm run dc-run-dev
```

## Access test environment workspace

Contact admins to receive the `env` variables and to be added to the test environment workspace.

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
