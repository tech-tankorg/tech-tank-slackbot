import { client } from "../config/sanity-config.ts";

export const generate_sanity_newsletter = async (date: string) => {
  const query = `*[_type=="letter" && scheduled_post_date=="${date}"]{letter_info[]->{title,description,images},letter_fyi[]->{title,description},letter_title,letter_description,scheduled_post_date,letter_member_highlight, letter_tech_insights[]->{title,description}}`;

  const results = await client.fetch(query);
  return results[0];
};
