import Axiom from "../../utils/config/axiom-config.ts";
import app from "../../utils/config/slack-config.ts";
import {
  AXIOM_DATA_SET,
  NON_INCLUSIVE_WORDS,
} from "../../utils/constants/consts.ts";
import { getRandomNumber } from "../../utils/helpers/general/generate-random-number.ts";
import { generate_inclusive_message } from "../../utils/helpers/misc/isThread.ts";

export const check_non_inclusive_words = () => {
  app.message(NON_INCLUSIVE_WORDS, async ({ message, client }) => {
    // biome-ignore lint: incorrect typescript types therefore any has to be enforced
    const msg = message as unknown as any;
    const user_id_sender = msg.user as string;
    const random_number = getRandomNumber(1, 5, false);
    const respond_type_1 =
      "How about 'friends' or 'everyone'? It's a small change that can make a big difference in creating a welcoming and inclusive environment for all :sparkles:";
    const respond_type_2 =
      "Have you considered 'y'all', or 'folks'? Let's make sure we create an inclusive community for everyone :blue_heart:";

    const userInfo = await client.users.info({
      user: user_id_sender,
    });

    if (random_number >= 3) {
      const obs = generate_inclusive_message(
        msg,
        respond_type_1,
        user_id_sender
      );

      const message_response = await client.chat.postEphemeral(obs);

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          inclusive_bot_message: {
            ok: message_response.ok,
            f_name: userInfo.user?.profile?.first_name,
            l_name: userInfo.user?.profile?.last_name,
            normalize_name: userInfo.user?.profile?.real_name_normalized,
          },
        },
      ]);
    } else {
      const obs = generate_inclusive_message(
        msg,
        respond_type_2,
        user_id_sender
      );

      const message_response = await client.chat.postEphemeral(obs);

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          inclusive_bot_message: {
            ok: message_response.ok,
            f_name: userInfo.user?.profile?.first_name,
            l_name: userInfo.user?.profile?.last_name,
            normalize_name: userInfo.user?.profile?.real_name_normalized,
          },
        },
      ]);
    }
  });
};
