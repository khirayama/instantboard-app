import { AxiosError, AxiosInstance } from 'axios';

export function handleRequestError(err: AxiosError, reject: () => void): void {
  const status: number | null = err.response ? err.response.status : null;
  const data: string | null = err.response ? err.response.data : null;

  if (status === 401) {
    window.location.href = '/login';
  }
  reject();
}
