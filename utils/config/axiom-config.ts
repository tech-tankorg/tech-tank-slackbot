import pkg from "@axiomhq/js";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { Axiom } = pkg;

const client = new Axiom({
  token: process.env.AXIOM_PERSONAL_TOKEN,
  orgId: process.env.AXIOM_ORG_ID,
});

export default client;
