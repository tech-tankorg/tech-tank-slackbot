import app from "../config/slack-config.ts";

export const dm_lst_of_people = async (
  lst_of_user_id: string[],
  message: string,
  additional_persons: string | string[] | null
) => {
  const additional_persons_formatted = Array.isArray(additional_persons)
    ? additional_persons.join(",")
    : additional_persons;
  return await Promise.allSettled(
    lst_of_user_id.map(async (id) => {
      const users =
        additional_persons_formatted !== null
          ? `${id},${additional_persons_formatted}`
          : `${id}`;
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
