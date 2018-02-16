import actionTypes from '../constants/action-types';
import { Task } from '../services';
import { transformTask } from './transforms';

export async function pollTask(dispatch: IDispatch): Promise<IAction> {
  try {
    const taskResponses: ITaskResponse[] = await Task.fetch();
    const tasks: ITask[] = taskResponses.map(transformTask);
    const action: IAction = {
      type: actionTypes.POLL_TASK_SUCCESS,
      payload: {
        tasks,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.POLL_TASK_FAILURE,
    };
    dispatch(action);
    return action;
  }
}

export async function fetchTask(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.FETCH_TASK,
  };
  dispatch(preAction);

  try {
    const taskResponses: ITaskResponse[] = await Task.fetch();
    const tasks: ITask[] = taskResponses.map(transformTask);
    const action: IAction = {
      type: actionTypes.FETCH_TASK_SUCCESS,
      payload: {
        tasks,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.FETCH_TASK_FAILURE,
    };
    dispatch(action);
    return action;
  }
}

export function createTask(dispatch: IDispatch, task: ITaskRequestParams): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.CREATE_TASK,
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Task.create(task)
      .then((newTask: ITaskResponse) => {
        const action: IAction = {
          type: actionTypes.CREATE_TASK_SUCCESS,
          payload: {
            task: transformTask(newTask),
          },
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.CREATE_TASK_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}

export function updateTask(dispatch: IDispatch, task: ITaskRequestId & ITaskRequestParams): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.UPDATE_TASK,
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Task.update(task)
      .then((newTask: ITaskResponse) => {
        const action: IAction = {
          type: actionTypes.UPDATE_TASK_SUCCESS,
          payload: {
            task: transformTask(newTask),
          },
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.UPDATE_TASK_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}

export function destroyTask(dispatch: IDispatch, task: ITaskRequestId) {
  const preAction: IAction = {
    type: actionTypes.DESTROY_TASK,
    payload: {
      task: transformTask(task),
    },
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Task.destroy(task)
      .then(() => {
        const action: IAction = {
          type: actionTypes.DESTROY_TASK_SUCCESS,
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.DESTROY_TASK_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}

export function sortTask(dispatch: IDispatch, task: ITaskRequestId, to: number) {
  const preAction: IAction = {
    type: actionTypes.SORT_TASK,
    payload: {
      task: transformTask(task),
      priority: to,
    },
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Task.sort(task, to)
      .then((tasks: ITaskResponse[]): void => {
        const action: IAction = {
          type: actionTypes.SORT_TASK_SUCCESS,
          payload: {
            tasks: tasks.map(transformTask),
          },
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action = {
          type: actionTypes.SORT_TASK_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}
