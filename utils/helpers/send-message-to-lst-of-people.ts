import app from "../config/slack-config.ts";

export const dm_lst_of_people = async (
  lst_of_user_id: string[],
  message: string,
  additional_person: string | null
) => {
  return await Promise.allSettled(
    lst_of_user_id.map(async (id) => {
      const users =
        additional_person !== null ? `${id},${additional_person}` : `${id}`;
      const channel = await app.client.conversations.open({
        users,
      });

      const sent_message = await app.client.chat.postMessage({
        channel: channel.channel?.id ?? "",
        text: message,
      });

      return sent_message;
    })
  );
};
