import actionTypes from '../constants/action-types';
import {
  Label,
  Member,
  Request,
  Task,
  User,
} from '../services';
import {
  transformTaskRequest,
  transformTaskResponse,
} from './transforms';

export function fetchTask(dispatch: IDispatch) {
  const _action: IAction = {
    type: actionTypes.FETCH_TASK,
  };
  dispatch(_action);

  return new Promise((resolve) => {
    Task.fetch().then((tasks: ITaskResponse[]) => {
      const action: IAction = {
        type: actionTypes.FETCH_TASK_SUCCESS,
        payload: {
          tasks: tasks.map(transformTaskResponse),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.FETCH_TASK_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function createTask(dispatch: IDispatch, task: ITaskRequest) {
  const _action: IAction = {
    type: actionTypes.CREATE_TASK,
  };
  dispatch(_action);

  return new Promise((resolve) => {
    Task.create(task).then((newTask: ITaskResponse) => {
      const action: IAction = {
        type: actionTypes.CREATE_TASK_SUCCESS,
        payload: {
          task: transformTaskResponse(newTask),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.CREATE_TASK_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function updateTask(dispatch: IDispatch, task: ITaskRequest) {
  const _action: IAction = {
    type: actionTypes.UPDATE_TASK,
  };
  dispatch(_action);

  return new Promise((resolve) => {
    Task.update(task).then((newTask: ITaskResponse) => {
      const action: IAction = {
        type: actionTypes.UPDATE_TASK_SUCCESS,
        payload: {
          task: transformTaskResponse(newTask),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.UPDATE_TASK_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function destroyTask(dispatch: IDispatch, task: ITaskRequest) {
  const _action: IAction = {
    type: actionTypes.DESTROY_TASK,
    payload: {
      task: transformTaskRequest(task),
    },
  };
  dispatch(_action);

  return new Promise((resolve) => {
    Task.destroy(task).then(() => {
      const action: IAction = {
        type: actionTypes.DESTROY_TASK_SUCCESS,
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.DESTROY_TASK_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function sortTask(dispatch: IDispatch, task: ITaskRequest, to: number) {
  const _action: IAction = {
    type: actionTypes.SORT_TASK,
    payload: {
      task: transformTaskRequest(task),
      priority: to,
    },
  };
  dispatch(_action);

  return new Promise((resolve) => {
    Task.sort(task, to).then((tasks: ITaskResponse[]) => {
      const action: IAction = {
        type: actionTypes.SORT_TASK_SUCCESS,
        payload: {
          tasks: tasks.map(transformTaskResponse),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.SORT_TASK_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}
