import axios, { type AxiosInstance } from 'axios';
import { BrazeSendClient } from './handlers/messages/send';
import { BrazeTrackClient } from './handlers/users/track';


export class BaseBrazeClient {
  client: AxiosInstance;
  token: string;
  url: string;
  appid: string;

  constructor(TOKEN: string, BASE_URL: string, APP_ID: string) {
    this.token = TOKEN;
    this.url = BASE_URL;
    this.appid = APP_ID;
    this.client = this.#initBraze();
  }

  #initBraze() {
    return axios.create({
      baseURL: this.url,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}




class BrazeClient {};
interface BrazeClient extends BrazeSendClient, BrazeTrackClient {};
applyMixins(BrazeClient, [BrazeSendClient, BrazeTrackClient]);
// the constructor is broken : (
const c = new BrazeClient();

console.log(c)
