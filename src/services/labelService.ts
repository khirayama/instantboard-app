import { AxiosError, AxiosInstance } from 'axios';
import { createRequest } from 'services/utils/createRequest';
import { handleRequestError } from 'services/utils/handleRequestError';

export const labelService: {
  req(): AxiosInstance;
  fetch(): Promise<ILabelResponse[]>;
  create(params: { name?: string; visibled?: boolean; priority?: number }): Promise<ILabelResponse>;
  update(params: { id: number; name?: string; visibled?: boolean; priority?: number }): Promise<ILabelResponse>;
  destroy(params: { id: number }): Promise<ILabelResponse>;
  sort(
    params: {
      id: number;
    },
    priority: number,
  ): Promise<ILabelResponse[]>;
} = {
  req: (): AxiosInstance => createRequest('/api/v1/labels'),

  fetch: (): Promise<ILabelResponse[]> => {
    return new Promise((resolve: (value: ILabelResponse[]) => void, reject: () => void): void => {
      labelService
        .req()
        .get('/')
        .then(({ data }: { data: ILabelResponse[] }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  create: (params: { name?: string; visibled?: boolean; priority?: number }): Promise<ILabelResponse> => {
    return new Promise((resolve: (value: ILabelResponse) => void, reject: () => void): void => {
      labelService
        .req()
        .post('/', params)
        .then(({ data }: { data: ILabelResponse }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  update: (params: { id: number; name?: string; visibled?: boolean; priority?: number }): Promise<ILabelResponse> => {
    return new Promise((resolve: (value: ILabelResponse) => void, reject: () => void): void => {
      labelService
        .req()
        .put(`/${params.id}`, params)
        .then(({ data }: { data: ILabelResponse }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  destroy: (params: { id: number }): Promise<ILabelResponse> => {
    return new Promise((resolve: (value: ILabelResponse) => void, reject: () => void): void => {
      labelService
        .req()
        .delete(`/${params.id}`)
        .then(({ data }: { data: ILabelResponse }): void => {
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
    return new Promise((resolve: (value: ILabelResponse[]) => void, reject: () => void): void => {
      labelService
        .req()
        .put(`/${params.id}/sort`, { priority })
        .then(({ data }: { data: ILabelResponse[] }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },
};
