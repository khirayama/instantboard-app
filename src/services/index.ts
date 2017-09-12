import axios from 'axios';
import * as uuid from 'uuid/v4';
import tokenManager from '../utils/token-manager';

const API_SERVER_PORT = process.env.API_SERVER_PORT;
const API_SERVER_HOSTNAME = process.env.API_SERVER_HOSTNAME;
const API_SERVER_HOST = `http://${API_SERVER_HOSTNAME}:${API_SERVER_PORT}`;

function handleRequestError(err: any, reject: any) {
  const status = err.response.status;
  const data = err.response.data;

  if (status === 401) {
    window.location.href = '/login';
  }
  reject(data);
}

const searchReq = axios.create({
  baseURL: `${API_SERVER_HOST}/api/v1/search`,
  headers: {
    Authorization: `Bearer ${tokenManager.get()}`,
  },
});

const Label = {
  req: axios.create({
    baseURL: `${API_SERVER_HOST}/api/v1/labels`,
    headers: {
      Authorization: `Bearer ${tokenManager.get()}`,
    },
  }),

  fetch: () => {
    return new Promise((resolve, reject) => {
      Label.req.get('/').then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },

  create: (params: ILabelRequest) => {
    return new Promise((resolve, reject) => {
      Label.req.post('/', params).then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },

  update: (params: ILabelRequest) => {
    return new Promise((resolve, reject) => {
      Label.req.put(`/${params.id}`, params).then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },

  destroy: (params: ILabelRequest) => {
    return new Promise((resolve, reject) => {
      Label.req.delete(`/${params.id}`).then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },

  sort: (params: ILabelRequest, priority: number) => {
    return new Promise((resolve, reject) => {
      Label.req.put(`/${params.id}/sort`, {priority}).then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },
};

const Task = {
  req: axios.create({
    baseURL: `${API_SERVER_HOST}/api/v1/tasks`,
    headers: {
      Authorization: `Bearer ${tokenManager.get()}`,
    },
  }),

  fetch: () => {
    return new Promise((resolve, reject) => {
      Task.req.get('/').then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },

  create: (params: ITaskRequest) => {
    return new Promise((resolve, reject) => {
      Task.req.post('/', params).then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },

  update: (params: ITaskRequest) => {
    return new Promise((resolve, reject) => {
      Task.req.put(`/${params.id}`, params).then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },

  destroy: (params: ITaskRequest) => {
    return new Promise((resolve, reject) => {
      Task.req.delete(`/${params.id}`).then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },

  sort: (params: ITaskRequest, priority: number) => {
    return new Promise((resolve, reject) => {
      Task.req.put(`/${params.id}/sort`, {priority}).then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },
};

const User = {
  req: axios.create({
    baseURL: `${API_SERVER_HOST}/api/v1/user`,
    headers: {
      Authorization: `Bearer ${tokenManager.get()}`,
    },
  }),

  get: () => {
    return new Promise((resolve, reject) => {
      User.req.get('/').then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },

  search: (params) => {
    return new Promise((resolve, reject) => {
      searchReq.get('/users', {params}).then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },
};

const Member = {
  req: axios.create({
    baseURL: `${API_SERVER_HOST}/api/v1/members`,
    headers: {
      Authorization: `Bearer ${tokenManager.get()}`,
    },
  }),

  fetch: () => {
    return new Promise((resolve, reject) => {
      Member.req.get('/').then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },
};

const Request = {
  req: axios.create({
    baseURL: `${API_SERVER_HOST}/api/v1/requests`,
    headers: {
      Authorization: `Bearer ${tokenManager.get()}`,
    },
  }),

  fetch: () => {
    return new Promise((resolve, reject) => {
      Request.req.get('/').then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },

  create: (params: IRequestRequest) => {
    return new Promise((resolve, reject) => {
      Request.req.post('/', params).then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },

  update: (params: IRequestRequest) => {
    return new Promise((resolve, reject) => {
      Request.req.put(`/${params.id}`, params).then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },

  destroy: (params: IRequestRequest) => {
    return new Promise((resolve, reject) => {
      Request.req.delete(`/${params.id}`).then(({data}) => {
        resolve(data);
      }).catch((err: any) => {
        handleRequestError(err, reject);
      });
    });
  },
};

export {
  Label,
  Task,
  User,
  Member,
  Request,
};
