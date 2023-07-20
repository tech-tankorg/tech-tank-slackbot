import axios from "axios";

export const generate_sanity_newsletter = async (date: string) => {
  const encodedURI = encodeURIComponent(
    `*[_type=="letter" && scheduled_post_date=="${date}"]{letter_info[]->{title,description},letter_fyi[]->{title,description},letter_title,letter_description,scheduled_post_date}`
  );
  const API_REQ = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/production?query=${encodedURI}`;
  const req = await axios.get(API_REQ);

  return req.data.result[0];
};
