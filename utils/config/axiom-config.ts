import axios, { AxiosResponse } from "axios";
import { config } from "dotenv";

config();

if (!process.env.AXIOM_API_TOKEN) {
  throw new Error("AXIOM_API_TOKEN environment variable is not defined");
}

class AxiomAPIClient {
  private apiUrl: string;
  private apiToken: string;

  constructor(apiToken: string) {
    this.apiUrl = "https://api.axiom.co/v1/datasets";
    this.apiToken = apiToken;
  }

  async ingestEvents(
    axiomDatasetName: string,
    data: Array<unknown>
  ): Promise<AxiosResponse<unknown>> {
    const url = `${this.apiUrl}/${axiomDatasetName}/ingest`;
    const headers = {
      Authorization: `Bearer ${this.apiToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(url, data, { headers });
      return response;
    } catch (error) {
      throw new Error(`Error ingesting data: ${error}`);
    }
  }
}

const client = new AxiomAPIClient(process.env.AXIOM_API_TOKEN);

export default client;
