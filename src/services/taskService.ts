import { AxiosError, AxiosInstance } from 'axios';
import { createRequest } from './utils/createRequest';
import { handleRequestError } from './utils/handleRequestError';

export const taskService = {
  req: (): AxiosInstance => createRequest('/api/v1/tasks'),

  fetch: (): Promise<ITaskResponse[]> => {
    return new Promise((resolve, reject): void => {
      taskService.req()
        .get('/')
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  create: (params: { labelId: number; content: string; completed?: boolean }): Promise<ITaskResponse> => {
    return new Promise((resolve, reject): void => {
      taskService.req()
        .post('/', params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  update: (params: { id: number; labelId?: number; content?: string; completed?: boolean }): Promise<ITaskResponse> => {
    return new Promise((resolve, reject): void => {
      taskService.req()
        .put(`/${params.id}`, params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  destroy: (params: { id: number }): Promise<ITaskResponse> => {
    return new Promise((resolve, reject): void => {
      taskService.req()
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
  ): Promise<ITaskResponse[]> => {
    return new Promise((resolve, reject): void => {
      taskService.req()
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
