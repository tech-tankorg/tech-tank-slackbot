import app from "../../utils/config/slack-config.ts";
import { is_admin } from "../../utils/helpers/feat-flag.ts";
import {
  sanitize_msg,
  remove_chars,
  generate_user_profile_string,
} from "../../utils/helpers/search-user-helper.ts";

import { send_message } from "../../utils/helpers/send-message.ts";
import Axiom from "../../utils/config/axiom-config.ts";
import { AXIOM_DATA_SET } from "../../utils/constants/consts.ts";
export const search_user = () => {
  app.message("!search-user", async ({ client, message }) => {
    // biome-ignore lint: incorrect typescript types therefore any has to be enforced
    const msg = message as any;
    const user_id_sender = msg.user as string;

    if (!is_admin(user_id_sender)) {
      await send_message({
        group: "user",
        id: user_id_sender,
        input: { type: "msg", message: "Only admins can use the command" },
      });

      return;
    }

    const sanitized_msg = sanitize_msg(msg.text);
    const user_lst = remove_chars(sanitized_msg, "!search-user").split(" ");

    const search_user_ids = user_lst.map((user) =>
      remove_chars(user, /[<@>]/g)
    );
    try {
      await Promise.all(
        search_user_ids.map(async (user_id) => {
          const user_profile = await client.users.profile.get({
            user: user_id,
          });
          const user = {
            userID: user_id,
            userName: user_profile.profile?.real_name_normalized ?? "",
            email: user_profile.profile?.email ?? "",
            displayName: user_profile.profile?.display_name_normalized ?? "",
            pronouns: user_profile.profile?.pronouns ?? "",
          };

          const msg_to_send = generate_user_profile_string(user);

          return send_message({
            group: "user",
            id: user_id_sender,
            input: { type: "msg", message: msg_to_send },
          });
        })
      );
    } catch (err) {
      // biome-ignore lint: incorrect typescript types therefore any has to be enforced
      const msg = message as any;
      const user_id_sender = msg.user as string;

      await Axiom.ingestEvents(AXIOM_DATA_SET, [
        {
          error_search_user: {
            err,
            user_id: user_id_sender,
          },
        },
      ]);
    }
  });
};
