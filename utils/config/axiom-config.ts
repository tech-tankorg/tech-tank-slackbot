import { Client } from "@axiomhq/axiom-node";

const client = new Client({
  token: process.env.AXIOM_PERSONAL_TOKEN,
  orgId: process.env.AXIOM_ORG_ID,
});

export default client;
