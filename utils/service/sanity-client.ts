import axios from "axios";

export const generate_sanity_newsletter = async (date: string) => {
  const encodedURI = encodeURIComponent(
    `*[_type=="letter" && scheduled_post_date=="${date}"]{letter_info[]->{title,description,images},letter_fyi[]->{title,description},letter_title,letter_description,scheduled_post_date,letter_member_highlight, letter_tech_insights[]->{title,description}}`
  );

  const sanity_project_id = process.env.SANITY_PROJECT_ID ?? "";
  const api_req = `https://${sanity_project_id}.api.sanity.io/v2021-10-21/data/query/production?query=${encodedURI}`;
  const req = await axios.get(api_req);

  return req.data.result[0];
};
