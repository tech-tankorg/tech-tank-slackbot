import app from "../../utils/config/slack-config.ts";

export const dm_lst_of_people = async (
  lst_of_user_id: string[],
  message: string
) => {
  return await Promise.all(
    lst_of_user_id.map(async (id) => {
      const channel = await app.client.conversations.open({
        users: id,
      });

      const mentee_message = await app.client.chat.postMessage({
        channel: channel.channel?.id ?? "",
        text: message,
      });

      return mentee_message;
    })
  );
};
