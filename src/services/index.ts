import axios, { AxiosInstance, AxiosError } from 'axios';
import * as http from 'http';
import tokenManager from '../utils/token-manager';

const API_SERVER_HOST = process.env.API_SERVER_HOST || 'http://127.0.0.1:3001';

function createRequest(baseURL: string = ''): AxiosInstance {
  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${tokenManager.get()}`,
    },
    httpAgent: new http.Agent({
      keepAlive: true,
    }),
  });
}

function handleRequestError(err: AxiosError, reject: any): void {
  const status: number | null = err.response ? err.response.status : null;
  const data: string | null = err.response ? err.response.data : null;

  if (status === 401) {
    window.location.href = '/login';
  }
  reject(data);
}

const searchReq = () => createRequest(`${API_SERVER_HOST}/api/v1/search`);

const Label = {
  req: (): AxiosInstance => createRequest(`${API_SERVER_HOST}/api/v1/labels`),

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

  create: (params: ILabelRequestParams): Promise<ILabelResponse> => {
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

  update: (params: ILabelRequestParams & ILabelRequestId): Promise<ILabelResponse> => {
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

  destroy: (params: ILabelRequestId): Promise<ILabelResponse> => {
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

  sort: (params: ILabelRequestId, priority: number): Promise<ILabelResponse[]> => {
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

const Task = {
  req: (): AxiosInstance => createRequest(`${API_SERVER_HOST}/api/v1/tasks`),

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

  update: (params: ITaskRequestId & ITaskRequestParams): Promise<ITaskResponse> => {
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

  destroy: (params: ITaskRequestId): Promise<ITaskResponse> => {
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

  sort: (params: ITaskRequestId, priority: number): Promise<ITaskResponse[]> => {
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

const User = {
  req: (): AxiosInstance => createRequest(`${API_SERVER_HOST}/api/v1/user`),

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

  search: (params: { q: string }): Promise<IUserResponse> => {
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

  fetchMember: (): Promise<IUserResponse[]> => {
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

const Request = {
  req: (): AxiosInstance => createRequest(`${API_SERVER_HOST}/api/v1/requests`),

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

  create: (params: IRequestRequestParams): Promise<IRequestResponse> => {
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

  update: (params: IRequestRequestId & IRequestRequestParams): Promise<IRequestResponse> => {
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

  destroy: (params: IRequestRequestId): Promise<IRequestResponse> => {
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

export { Label, Task, User, Request };
