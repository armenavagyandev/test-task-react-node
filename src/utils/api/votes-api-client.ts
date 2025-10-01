import { AxiosInstance } from "axios";

export default class VotesApiClient {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async create(data: { idea_id: number }) {
    return await this.http.post("/votes", data);
  }

  async delete(id: number) {
    return await this.http.delete(`/votes/${id}`);
  }
}
