import { AxiosError, AxiosInstance } from 'axios';
import { createRequest } from 'services/utils/createRequest';
import { handleRequestError } from 'services/utils/handleRequestError';

const searchReq: () => AxiosInstance = (): AxiosInstance => createRequest('/api/v1/search');

export const userService: {
  req(): AxiosInstance;
  get(): Promise<IUserResponse>;
  search(params: { q: string }): Promise<IMemberResponse[]>;
  delete(): Promise<void>;
  fetchMember(): Promise<IMemberResponse[]>;
} = {
  req: (): AxiosInstance => createRequest('/api/v1/user'),

  get: (): Promise<IUserResponse> => {
    return new Promise((resolve: (value: IUserResponse) => void, reject: () => void): void => {
      userService
        .req()
        .get('/')
        .then(({ data }: { data: IUserResponse }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  search: (params: { q: string }): Promise<IMemberResponse[]> => {
    return new Promise((resolve: (value: IMemberResponse[]) => void, reject: () => void): void => {
      searchReq()
        .get('/users', { params })
        .then(({ data }: { data: IMemberResponse[] }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  delete: (): Promise<void> => {
    return new Promise((resolve: () => void, reject: () => void): void => {
      userService
        .req()
        .delete('/')
        .then((): void => {
          resolve();
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  fetchMember: (): Promise<IMemberResponse[]> => {
    return new Promise((resolve: (value: IMemberResponse[]) => void, reject: () => void): void => {
      userService
        .req()
        .get('/members')
        .then(({ data }: { data: IMemberResponse[] }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },
};
