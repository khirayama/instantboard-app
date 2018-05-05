import axios, { AxiosInstance } from 'axios';
import { tokenManager } from 'utils/tokenManager';

const API_SERVER_HOST: string = process.env.API_SERVER_HOST || 'http://127.0.0.1:3001'; // tslint:disable-line:no-http-string

export function createRequest(baseURL: string): AxiosInstance {
  return axios.create({
    baseURL: API_SERVER_HOST + baseURL,
    headers: {
      Authorization: `Bearer ${tokenManager.get()}`,
    },
  });
}
