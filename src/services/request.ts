import { AxiosInstance, AxiosError } from 'axios';
import createRequest from './utils/create-request';
import handleRequestError from './utils/handle-request-error';

const Request = {
  req: (): AxiosInstance => createRequest('/api/v1/requests'),

  fetch: (params: { status: string }): Promise<IRequestResponse[]> => {
    return new Promise((resolve, reject): void => {
      Request.req()
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
      Request.req()
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
      Request.req()
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
      Request.req()
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

export default Request;
