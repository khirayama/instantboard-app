import { AxiosError, AxiosInstance } from 'axios';
import { createRequest } from './utils/createRequest';
import { handleRequestError } from './utils/handleRequestError';

export const requestService = {
  req: (): AxiosInstance => createRequest('/api/v1/requests'),

  fetch: (params: { status: string }): Promise<IRequestResponse[]> => {
    return new Promise((resolve, reject): void => {
      requestService.req()
        .get('/', { params })
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  create: (params: { status?: string; labelId: number; memberId: number }): Promise<IRequestResponse> => {
    return new Promise((resolve, reject): void => {
      requestService.req()
        .post('/', params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  update: (params: { id: number; status?: string; labelId: number; memberId: number }): Promise<IRequestResponse> => {
    return new Promise((resolve, reject): void => {
      requestService.req()
        .put(`/${params.id}`, params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  destroy: (params: { id: number }): Promise<IRequestResponse> => {
    return new Promise((resolve, reject): void => {
      requestService.req()
        .delete(`/${params.id}`)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },
};
