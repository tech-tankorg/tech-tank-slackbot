export const find_web_address = (str: string) => {
  const formatted_link_present = str.match("<a href=");
  const matches = str.match("https://");

  if (formatted_link_present === null)
    return str.slice(matches?.index).split(" ")[0];

  const final = str.slice(matches?.index).split(`"`)[0];

  return final;
};
