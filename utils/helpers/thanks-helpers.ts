import { THANKS_CHANNEL_MESSAGE_SEPARATOR } from "../constants/consts.ts";

export const get_recipients = (message: string) => {
  const mentions = message.match(THANKS_CHANNEL_MESSAGE_SEPARATOR);

  if (mentions !== null) {
    return mentions.map((mention) => mention.trim());
  } else {
    return [];
  }
};

export const remove_chars = (message: string, reg_exp: RegExp) => {
  const cleanedMessage = message.replace(reg_exp, "");
  return cleanedMessage.trim();
};
