import client from "../utils/config/axiom-config.ts";
import app from "../utils/config/slack-config.ts";

import { greet_new_team_member } from "./Events/greetings.ts";
import { sayHello } from "./Events/sayHello.ts";

import { thanks } from "../src/Events/thanks.ts";
import { app_home_opened } from "./Events/app_home.ts";
import {
  accept_coc,
  deny_coc,
  open_coc_modal,
} from "./Events/open_coc_modal.ts";

import { check_non_inclusive_words } from "./Events/inclusive.ts";

import {
  edit_message_command,
  handle_edit_message_submit,
  handle_view_message_submit,
  handle_view_message_tab_submit,
} from "./Slash-commands/edit-message.ts";
import { jokes } from "./Slash-commands/jokes.ts";
import { notify_admins } from "./Slash-commands/notify-admins.ts";
import { suggestion } from "./Slash-commands/suggestions.ts";

import { search_user } from "./Slash-commands/search-user.ts";

import { AXIOM_DATA_SET } from "../utils/constants/consts.ts";

import { coffee_chat_config } from "../utils/config/channel-config.ts";
import {
  coffee_chat_bio,
  coffee_chat_bot_joined_channel,
  coffee_chat_bot_left_channel,
  coffee_chat_user_activate,
  coffee_chat_user_deactivate,
  handle_close_coffee_chat_bio_modal,
  handle_coffee_chat_bio_submit,
} from "./Events/shuffle_bot.ts";

import {
  open_survey_modal,
  survey_submit,
} from "../utils/helpers/survey/survey_actions.ts";
import { guppymail } from "./Slash-commands/guppymail.ts";
import { download_survey_results } from "./Slash-commands/slack_upload_files.ts";

// Events
sayHello();
greet_new_team_member();

app_home_opened();
check_non_inclusive_words();

// Slash commands
jokes();
suggestion();
open_coc_modal();
notify_admins();
search_user();

edit_message_command();
handle_edit_message_submit();
handle_view_message_submit();
handle_view_message_tab_submit();

edit_message_command();
handle_edit_message_submit();
handle_view_message_submit();
handle_view_message_tab_submit();

// actions
accept_coc();
deny_coc();

void thanks();

//  coffee chat bot
coffee_chat_bot_joined_channel(coffee_chat_config.active_channels);
coffee_chat_bot_left_channel(coffee_chat_config.active_channels);
coffee_chat_user_activate();
coffee_chat_user_deactivate();
coffee_chat_bio();
handle_coffee_chat_bio_submit();
handle_close_coffee_chat_bio_modal();

// TechTank Survey

open_survey_modal();
survey_submit();

download_survey_results();

// guppyMail
guppymail();

await (async () => {
  // Start your app
  await app.start();

  await client.ingestEvents(AXIOM_DATA_SET, [{ start: "App has started" }]);

  console.log("⚡️ Bolt app is running!");
})();
