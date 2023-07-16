import { AxiosRequestConfig } from 'axios';
import { BaseBrazeClient } from '../../braze';
import { BrazeTrackRequest, BrazeTrackResponse } from '../../types/users/track';

export type BrazeSendMessageCallback = (res?: BrazeTrackResponse, err?: Error) => unknown;

export class BrazeTrackClient extends BaseBrazeClient {

  constructor(TOKEN: string, BASE_URL: string, APP_ID: string) {
    super(TOKEN, BASE_URL, APP_ID);
  }
  
  async trackBrazeRecord(req: BrazeTrackRequest, bulk = false, callback?: BrazeSendMessageCallback ): Promise<[success: boolean, data?: BrazeTrackResponse, error?: Error]> {

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'X-Braze-Bulk': bulk,
      },
      url: '/users/track',
      method: 'post',
      data: req,
    };

    let success: boolean = false;
    let data: BrazeTrackResponse | undefined;
    let error: Error | undefined;
    try {
      const res = await this.client.request<BrazeTrackResponse>(config);
      data = res.data;
      success = data.message === 'success';
    } catch (err) {
      error = err as Error;
    }

    if (callback) callback(data, error);

    return [success, data, error];
  }
}
