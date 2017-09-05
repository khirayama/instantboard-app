import axios from 'axios';
import * as uuid from 'uuid/v4';
import tokenManager from '../utils/token-manager';

const API_SERVER_PORT = process.env.API_SERVER_PORT;
const API_SERVER_HOSTNAME = process.env.API_SERVER_HOSTNAME;
const API_SERVER_HOST = `http://${API_SERVER_HOSTNAME}:${API_SERVER_PORT}`;

function handleRequestError(err: any, reject: any) {
  const status = err.response.status;

  if (status === 401) {
    window.location.href = '/login';
  }
  reject(err);
}

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

export {
  Label,
  Task,
};
