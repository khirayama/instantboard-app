import axios from 'axios';
import * as http from 'http';
import tokenManager from '../utils/token-manager';

const API_SERVER_HOST = process.env.API_SERVER_HOST || 'http://127.0.0.1:3001';

// AxiosInstance
function createRequest(baseURL: string = ''): any {
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

function handleRequestError(err: any, reject: any): void {
  const status: number = err.response.status;
  const data: string = err.response.data;

  if (status === 401) {
    window.location.href = '/login';
  }
  reject(data);
}

const searchReq = () => createRequest(`${API_SERVER_HOST}/api/v1/search`);

const Label = {
  req: (): any => createRequest(`${API_SERVER_HOST}/api/v1/labels`),

  fetch: (): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Label.req()
        .get('/')
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  create: (params: ILabelRequestParams): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Label.req()
        .post('/', params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  update: (params: ILabelRequestParams & ILabelRequestId): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Label.req()
        .put(`/${params.id}`, params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  destroy: (params: ILabelRequestId): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Label.req()
        .delete(`/${params.id}`)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  sort: (params: ILabelRequestId, priority: number): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Label.req()
        .put(`/${params.id}/sort`, { priority })
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },
};

const Task = {
  req: (): any => createRequest(`${API_SERVER_HOST}/api/v1/tasks`),

  fetch: (): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Task.req()
        .get('/')
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  create: (params: ITaskRequestParams): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Task.req()
        .post('/', params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  update: (params: ITaskRequestId & ITaskRequestParams): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Task.req()
        .put(`/${params.id}`, params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  destroy: (params: ITaskRequestId): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Task.req()
        .delete(`/${params.id}`)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  sort: (params: ITaskRequestId, priority: number): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Task.req()
        .put(`/${params.id}/sort`, { priority })
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },
};

const User = {
  req: (): any => createRequest(`${API_SERVER_HOST}/api/v1/user`),

  get: (): Promise<{}> => {
    return new Promise((resolve, reject): any => {
      User.req()
        .get('/')
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  search: (params: { q: string }): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      searchReq()
        .get('/users', { params })
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  delete: (): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      User.req()
        .delete('/')
        .then((): void => {
          resolve();
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  fetchMember: (): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      User.req()
        .get('/members')
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },
};

const Request = {
  req: (): any => createRequest(`${API_SERVER_HOST}/api/v1/requests`),

  fetch: (params: { status: string }): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Request.req()
        .get('/', { params })
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  create: (params: any): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Request.req()
        .post('/', params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  update: (params: IRequestRequestId & IRequestRequestParams): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Request.req()
        .put(`/${params.id}`, params)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },

  destroy: (params: IRequestRequestId): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      Request.req()
        .delete(`/${params.id}`)
        .then(({ data }): void => {
          resolve(data);
        })
        .catch((err: any): void => {
          handleRequestError(err, reject);
        });
    });
  },
};

export { Label, Task, User, Request };
