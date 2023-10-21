import { THANKS_CHANNEL_MESSAGE_SEPARATOR_REGEX } from "../constants/consts.ts";

import type {
  db_thanks,
  db_thanks_no_reciever,
} from "../types/projectTypes.ts";
export const get_recipients = (message: string) => {
  const mentions = message.match(THANKS_CHANNEL_MESSAGE_SEPARATOR_REGEX);

  if (mentions === null) return [];

  return mentions.map((mention) => mention.trim());
};

export const remove_chars = (message: string, reg_exp: RegExp) => {
  const cleanedMessage = message.replace(reg_exp, "");
  return cleanedMessage.trim();
};

export const format_thanks_reponse = (thanks_array: db_thanks[]) => {
  const obj: Record<string, db_thanks_no_reciever[]> = {};

  thanks_array.forEach((item) => {
    const keys = Object.keys(obj);

    if (keys.includes(item.user_id_receiver)) {
      obj[item.user_id_receiver]?.push({
        user_id_sender: item.user_id_sender,
        message: item.message,
        date_created: item.date_created,
      });
    } else {
      obj[item.user_id_receiver] = [
        {
          user_id_sender: item.user_id_sender,
          message: item.message,
          date_created: item.date_created,
        },
      ];
    }
  });

  return obj;
};

export const sanitize_msg = (msg: string) => {
  const regex = /!(thanks|shoutout)[^\n\r.!?;,:]*[\n\r.!?;,:]?/;

  const match = regex.exec(msg);

  if (match === null) return "";

  return match[0];
};
