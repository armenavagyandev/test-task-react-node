import axios from "axios";
import IdeasApiClient from "utils/api/ideas-api-client";
import VotesApiClient from "utils/api/votes-api-client";

const http = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default class ApiClient {
  static ideas = new IdeasApiClient(http);
  static votes = new VotesApiClient(http);
}
