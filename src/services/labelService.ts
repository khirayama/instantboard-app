import { AxiosError, AxiosInstance } from 'axios';
import { createRequest } from './utils/createRequest';
import { handleRequestError } from './utils/handleRequestError';

export const labelService = {
  req: (): AxiosInstance => createRequest('/api/v1/labels'),

  fetch: (): Promise<ILabelResponse[]> => {
    return new Promise((resolve, reject): void => {
      labelService
        .req()
        .get('/')
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  create: (params: { name?: string; visibled?: boolean; priority?: number }): Promise<ILabelResponse> => {
    return new Promise((resolve, reject): void => {
      labelService
        .req()
        .post('/', params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  update: (params: { id: number; name?: string; visibled?: boolean; priority?: number }): Promise<ILabelResponse> => {
    return new Promise((resolve, reject): void => {
      labelService
        .req()
        .put(`/${params.id}`, params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  destroy: (params: { id: number }): Promise<ILabelResponse> => {
    return new Promise((resolve, reject): void => {
      labelService
        .req()
        .delete(`/${params.id}`)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  sort: (
    params: {
      id: number;
    },
    priority: number,
  ): Promise<ILabelResponse[]> => {
    return new Promise((resolve, reject): void => {
      labelService
        .req()
        .put(`/${params.id}/sort`, { priority })
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },
};
