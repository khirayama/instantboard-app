import axios, { AxiosInstance } from 'axios';
import * as http from 'http';
import { tokenManager } from 'utils/token-manager';

const API_SERVER_HOST = process.env.API_SERVER_HOST || 'http://127.0.0.1:3001';

export default function createRequest(baseURL: string = ''): AxiosInstance {
  return axios.create({
    baseURL: API_SERVER_HOST + baseURL,
    headers: {
      Authorization: `Bearer ${tokenManager.get()}`,
    },
    httpAgent: new http.Agent({
      keepAlive: true,
    }),
  });
}
