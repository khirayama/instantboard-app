import { AxiosInstance, AxiosError } from 'axios';
import createRequest from './utils/create-request';
import handleRequestError from './utils/handle-request-error';

const Label = {
  req: (): AxiosInstance => createRequest('/api/v1/labels'),

  fetch: (): Promise<ILabelResponse[]> => {
    return new Promise((resolve, reject): void => {
      Label.req()
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
      Label.req()
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
      Label.req()
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
      Label.req()
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
      Label.req()
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

export default Label;
