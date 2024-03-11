interface user {
  userID: string;
  userName: string;
  email: string;
  displayName: string;
  pronouns: string;
}
export const sanitize_msg = (msg: string) => {
  const regex = /!search-user[^\n\r.!?;,:]*[\n\r.!?;,:]?/;

  const match = regex.exec(msg);

  if (match === null) return "";

  return match[0].trim();
};

export const remove_chars = (message: string, reg_exp: RegExp | string) => {
  const cleanedMessage = message.replace(reg_exp, "");
  return cleanedMessage.trim();
};

export const generate_user_profile_string = (user: user) => {
  return `UserId: ${user.userID}\nDisplayName: ${user.displayName}\nUserName: ${user.userName}\nPronouns: ${user.pronouns}\nEmail: ${user.email}`;
};
