import { AxiosError, AxiosInstance } from 'axios';
import createRequest from './utils/create-request';
import { handleRequestError } from './utils/handleRequestError';

const searchReq = () => createRequest('/api/v1/search');

const User = {
  req: (): AxiosInstance => createRequest('/api/v1/user'),

  get: (): Promise<IUserResponse> => {
    return new Promise((resolve, reject): void => {
      User.req()
        .get('/')
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  search: (params: { q: string }): Promise<IMemberResponse[]> => {
    return new Promise((resolve, reject): void => {
      searchReq()
        .get('/users', { params })
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  delete: (): Promise<void> => {
    return new Promise((resolve, reject): void => {
      User.req()
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
    return new Promise((resolve, reject): void => {
      User.req()
        .get('/members')
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },
};

export default User;
