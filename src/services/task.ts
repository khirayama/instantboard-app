import { AxiosInstance, AxiosError } from 'axios';
import createRequest from './utils/create-request';
import handleRequestError from './utils/handle-request-error';

const Task = {
  req: (): AxiosInstance => createRequest('/api/v1/tasks'),

  fetch: (): Promise<ITaskResponse[]> => {
    return new Promise((resolve, reject): void => {
      Task.req()
        .get('/')
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  create: (params: ITaskRequestParams): Promise<ITaskResponse> => {
    return new Promise((resolve, reject): void => {
      Task.req()
        .post('/', params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  update: (params: ITaskRequestParams): Promise<ITaskResponse> => {
    return new Promise((resolve, reject): void => {
      Task.req()
        .put(`/${params.id}`, params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  destroy: (params: ITaskRequestParams): Promise<ITaskResponse> => {
    return new Promise((resolve, reject): void => {
      Task.req()
        .delete(`/${params.id}`)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: AxiosError): void => {
          handleRequestError(err, reject);
        });
    });
  },

  sort: (params: ITaskRequestParams, priority: number): Promise<ITaskResponse[]> => {
    return new Promise((resolve, reject): void => {
      Task.req()
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

export default Task;
