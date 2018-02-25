import actionTypes from '../constants/action-types';
import Task from '../services/task';
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

export async function createTask(
  dispatch: IDispatch,
  params: {
    labelId: number;
    content: string;
  },
): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.CREATE_TASK,
  };
  dispatch(preAction);

  try {
    const taskResponse: ITaskResponse = await Task.create(params);
    const task: ITask = transformTask(taskResponse);
    const action: IAction = {
      type: actionTypes.CREATE_TASK_SUCCESS,
      payload: {
        task,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.CREATE_TASK_FAILURE,
    };
    dispatch(action);
    return action;
  }
}

export async function updateTask(
  dispatch: IDispatch,
  params: {
    id: number;
    labelId?: number;
    content?: string;
    completed?: boolean;
  },
): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.UPDATE_TASK,
  };
  dispatch(preAction);

  try {
    const taskResponse: ITaskResponse = await Task.update(params);
    const task: ITask = transformTask(taskResponse);
    const action: IAction = {
      type: actionTypes.UPDATE_TASK_SUCCESS,
      payload: {
        task,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.UPDATE_TASK_FAILURE,
    };
    dispatch(action);
    return action;
  }
}

export async function destroyTask(
  dispatch: IDispatch,
  params: {
    id: number;
  },
) {
  const preAction: IAction = {
    type: actionTypes.DESTROY_TASK,
    payload: {
      task: transformTask(params),
    },
  };
  dispatch(preAction);

  try {
    await Task.destroy(params);
    const action: IAction = {
      type: actionTypes.DESTROY_TASK_SUCCESS,
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.DESTROY_TASK_FAILURE,
    };
    dispatch(action);
    return action;
  }
}

export async function sortTask(
  dispatch: IDispatch,
  params: {
    id: number;
  },
  to: number,
) {
  const preAction: IAction = {
    type: actionTypes.SORT_TASK,
    payload: {
      task: transformTask(params),
      priority: to,
    },
  };
  dispatch(preAction);

  try {
    const taskResponses: ITaskResponse[] = await Task.sort(params, to);
    const tasks: ITask[] = taskResponses.map(transformTask);
    const action: IAction = {
      type: actionTypes.SORT_TASK_SUCCESS,
      payload: {
        tasks,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action = {
      type: actionTypes.SORT_TASK_FAILURE,
    };
    dispatch(action);
    return action;
  }
}
