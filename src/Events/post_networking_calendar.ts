import app from "../../utils/config/slack-config.ts";
import { generate_networking_post } from "../../utils/helpers/generate_networking_calendar.ts";

import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";

import { channels } from "../../utils/config/channel-config.ts";

import { send_message } from "../../utils/helpers/send-message.ts";

export const post_networking_calendar = async (): Promise<void> => {
  try {
    const post = await generate_networking_post();
    // console.log(post);

    await app.client.chat.postMessage({
      text: "test",
      channel: "C056JH0BDQD",
      blocks: post,
    });

    // await Axiom.ingestEvents(AXIOM_DATA_SET, [
    //   {
    //     networking_calendar_post: {},
    //   },
    // ]);
  } catch (error) {
    // await Axiom.ingestEvents(AXIOM_DATA_SET, [
    //   { error_networking_calendar_post: error },
    // ]);
  }
};
