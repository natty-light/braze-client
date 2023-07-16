import type { AxiosRequestConfig } from 'axios';
import type { BrazeSendMessageRequest, BrazeSendMessageResponse } from '../../types/messages/send';
import { BaseBrazeClient } from '../../braze';

export type BrazeSendMessageCallback = (res?: BrazeSendMessageResponse, err?: Error) => unknown;

export class BrazeSendClient extends BaseBrazeClient {

  constructor(TOKEN: string, BASE_URL: string, APP_ID: string) {
    super(TOKEN, BASE_URL, APP_ID);
  }

  async sendEmail(req: BrazeSendMessageRequest, callback?: BrazeSendMessageCallback): Promise<[success: boolean, data?: BrazeSendMessageResponse, error?: Error]> {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      url: 'messages/send',
      method: 'post',
      data: req,
    };
  
    let success = false;
    let data: BrazeSendMessageResponse | undefined;
    let error: Error | undefined;
    try {
      const res = await this.client.request<BrazeSendMessageResponse>(config);
      data = res.data;
      success = res.data.message === 'success';
    } catch (err) {
      error = err as Error;
    }

    if (callback !== undefined) callback(data, error);

    return [success, data, error];
  }
}

