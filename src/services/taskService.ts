import { AxiosError, AxiosInstance } from 'axios';
import { createRequest } from 'services/utils/createRequest';
import { handleRequestError } from 'services/utils/handleRequestError';

export const taskService: {
  req(): AxiosInstance;
  fetch(): Promise<ITaskResponse[]>;
  create(params: { labelId: number; content: string; completed?: boolean }): Promise<ITaskResponse>;
  update(params: { id: number; labelId?: number; content?: string; completed?: boolean }): Promise<ITaskResponse>;
  destroy(params: { id: number }): Promise<ITaskResponse>;
  sort(
    params: {
      id: number;
    },
    priority: number,
  ): Promise<ITaskResponse[]>;
} = {
  req: (): AxiosInstance => createRequest('/api/v1/tasks'),

  fetch: (): Promise<ITaskResponse[]> => {
    return new Promise((resolve: (value: ITaskResponse[]) => void, reject: () => void): void => {
      taskService
        .req()
        .get('/')
        .then(({ data }: { data: ITaskResponse[] }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  create: (params: { labelId: number; content: string; completed?: boolean }): Promise<ITaskResponse> => {
    return new Promise((resolve: (value: ITaskResponse) => void, reject: () => void): void => {
      taskService
        .req()
        .post('/', params)
        .then(({ data }: { data: ITaskResponse }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  update: (params: { id: number; labelId?: number; content?: string; completed?: boolean }): Promise<ITaskResponse> => {
    return new Promise((resolve: (value: ITaskResponse) => void, reject: () => void): void => {
      taskService
        .req()
        .put(`/${params.id}`, params)
        .then(({ data }: { data: ITaskResponse }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  destroy: (params: { id: number }): Promise<ITaskResponse> => {
    return new Promise((resolve: (value: ITaskResponse) => void, reject: () => void): void => {
      taskService
        .req()
        .delete(`/${params.id}`)
        .then(({ data }: { data: ITaskResponse }): void => {
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
  ): Promise<ITaskResponse[]> => {
    return new Promise((resolve: (value: ITaskResponse[]) => void, reject: () => void): void => {
      taskService
        .req()
        .put(`/${params.id}/sort`, { priority })
        .then(({ data }: { data: ITaskResponse[] }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },
};
