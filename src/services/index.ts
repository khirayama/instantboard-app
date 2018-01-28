import axios from 'axios';
import * as http from 'http';
import tokenManager from '../utils/token-manager';

const API_SERVER_HOST = process.env.API_SERVER_HOST || 'http://127.0.0.1:3001';

function createRequest(baseURL = '') {
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

function handleRequestError(err: any, reject: any) {
  const status = err.response.status;
  const data = err.response.data;

  if (status === 401) {
    window.location.href = '/login';
  }
  reject(data);
}

const searchReq = () => createRequest(`${API_SERVER_HOST}/api/v1/search`);

const Label = {
  req: () => createRequest(`${API_SERVER_HOST}/api/v1/labels`),

  fetch: () => {
    return new Promise((resolve, reject) => {
      Label.req()
        .get('/')
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },

  create: (params: ILabelCreateRequest) => {
    return new Promise((resolve, reject) => {
      Label.req()
        .post('/', params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },

  update: (params: ILabelRequest) => {
    return new Promise((resolve, reject) => {
      Label.req()
        .put(`/${params.id}`, params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },

  destroy: (params: ILabelRequest) => {
    return new Promise((resolve, reject) => {
      Label.req()
        .delete(`/${params.id}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },

  sort: (params: ILabelRequest, priority: number) => {
    return new Promise((resolve, reject) => {
      Label.req()
        .put(`/${params.id}/sort`, { priority })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },
};

const Task = {
  req: () => createRequest(`${API_SERVER_HOST}/api/v1/tasks`),

  fetch: () => {
    return new Promise((resolve, reject) => {
      Task.req()
        .get('/')
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },

  create: (params: ITaskCreateRequest) => {
    return new Promise((resolve, reject) => {
      Task.req()
        .post('/', params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },

  update: (params: ITaskRequest) => {
    return new Promise((resolve, reject) => {
      Task.req()
        .put(`/${params.id}`, params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },

  destroy: (params: ITaskRequest) => {
    return new Promise((resolve, reject) => {
      Task.req()
        .delete(`/${params.id}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },

  sort: (params: ITaskRequest, priority: number) => {
    return new Promise((resolve, reject) => {
      Task.req()
        .put(`/${params.id}/sort`, { priority })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },
};

const User = {
  req: () => createRequest(`${API_SERVER_HOST}/api/v1/user`),

  get: () => {
    return new Promise((resolve, reject) => {
      User.req()
        .get('/')
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },

  search: params => {
    return new Promise((resolve, reject) => {
      searchReq()
        .get('/users', { params })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },

  delete: () => {
    return new Promise((resolve, reject) => {
      User.req()
        .delete('/')
        .then(() => {
          resolve();
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },
};

const Member = {
  req: () => createRequest(`${API_SERVER_HOST}/api/v1/users/members`),

  fetch: () => {
    return new Promise((resolve, reject) => {
      Member.req()
        .get('/')
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },
};

const Request = {
  req: () => createRequest(`${API_SERVER_HOST}/api/v1/requests`),

  fetch: params => {
    return new Promise((resolve, reject) => {
      Request.req()
        .get('/', { params })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },

  create: (params: IRequestRequest) => {
    return new Promise((resolve, reject) => {
      Request.req()
        .post('/', params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },

  update: (params: IRequestRequest) => {
    return new Promise((resolve, reject) => {
      Request.req()
        .put(`/${params.id}`, params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },

  destroy: (params: IRequestRequest) => {
    return new Promise((resolve, reject) => {
      Request.req()
        .delete(`/${params.id}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err: any) => {
          handleRequestError(err, reject);
        });
    });
  },
};

export { Label, Task, User, Member, Request };
