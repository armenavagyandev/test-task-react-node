import { AxiosInstance } from "axios";

export default class IdeasApiClient {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async index() {
    return await this.http.get("/ideas");
  }
}
