import { AxiosError, AxiosInstance } from 'axios';
import { createRequest } from 'services/utils/createRequest';
import { handleRequestError } from 'services/utils/handleRequestError';

export const requestService: {
  req(): AxiosInstance;
  fetch(params: { status: string }): Promise<IRequestResponse[]>;
  create(params: { status?: string; labelId: number; memberId: number }): Promise<IRequestResponse>;
  update(params: { id: number; status?: string; labelId: number; memberId: number }): Promise<IRequestResponse>;
  destroy(params: { id: number }): Promise<IRequestResponse>;
} = {
  req: (): AxiosInstance => createRequest('/api/v1/requests'),

  fetch: (params: { status: string }): Promise<IRequestResponse[]> => {
    return new Promise((resolve: (value: IRequestResponse[]) => void, reject: () => void): void => {
      requestService
        .req()
        .get('/', { params })
        .then(({ data }: { data: IRequestResponse[] }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  create: (params: { status?: string; labelId: number; memberId: number }): Promise<IRequestResponse> => {
    return new Promise((resolve: (value: IRequestResponse) => void, reject: () => void): void => {
      requestService
        .req()
        .post('/', params)
        .then(({ data }: { data: IRequestResponse }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  update: (params: { id: number; status?: string; labelId: number; memberId: number }): Promise<IRequestResponse> => {
    return new Promise((resolve: (value: IRequestResponse) => void, reject: () => void): void => {
      requestService
        .req()
        .put(`/${params.id}`, params)
        .then(({ data }: { data: IRequestResponse }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  destroy: (params: { id: number }): Promise<IRequestResponse> => {
    return new Promise((resolve: (value: IRequestResponse) => void, reject: () => void): void => {
      requestService
        .req()
        .delete(`/${params.id}`)
        .then(({ data }: { data: IRequestResponse }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },
};
