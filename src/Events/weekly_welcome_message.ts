import app from "../../utils/config/slack-config.ts";
import { get_document_reference } from "../../utils/config/firebase-config.ts";
import { getDoc } from "firebase/firestore";
import { getWeek } from "date-fns";

import { welcomes_type } from "../../utils/types/zod-types.ts";

import { channels } from "../../utils/config/channel-config.ts";

const format_users_array = (lst: string[]) => {
  return lst.map((item) => `<@${item}>`);
};

export const send_weekly_welcome_message = async () => {
  const now = new Date();
  const doc_id = `week-${getWeek(now) - 1}`;
  const doc_ref = await get_document_reference("welcomes", doc_id);
  const doc_snapshot = await getDoc(doc_ref);

  const doc = welcomes_type.parse(doc_snapshot.data());
  const formatted_users_array = format_users_array(doc.users);

  if (doc.users.length >= 1) {
    const message = `Hey everyone, please join us in welcoming ${formatted_users_array.join(
      ", "
    )} to the tank!`;
    await app.client.chat.postMessage({
      channel: channels.general,
      text: message,
    });
  }
};
