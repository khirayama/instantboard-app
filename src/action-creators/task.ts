import { transformTask } from 'action-creators/transforms';
import actionTypes from 'constants/action-types';
import { taskService } from 'services/taskService';

export async function pollTask(dispatch: IDispatch): Promise<IAction> {
  try {
    const taskResponses: ITaskResponse[] = await taskService.fetch();
    const tasks: ITask[] = taskResponses.map(transformTask);
    const action: IAction = {
      actionType: actionTypes.POLL_TASK_SUCCESS,
      payload: {
        tasks,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.POLL_TASK_FAILURE,
    };
    dispatch(action);

    return action;
  }
}

export async function fetchTask(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.FETCH_TASK,
  };
  dispatch(preAction);

  try {
    const taskResponses: ITaskResponse[] = await taskService.fetch();
    const tasks: ITask[] = taskResponses.map(transformTask);
    const action: IAction = {
      actionType: actionTypes.FETCH_TASK_SUCCESS,
      payload: {
        tasks,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.FETCH_TASK_FAILURE,
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
    actionType: actionTypes.CREATE_TASK,
  };
  dispatch(preAction);

  try {
    const taskResponse: ITaskResponse = await taskService.create(params);
    const task: ITask = transformTask(taskResponse);
    const action: IAction = {
      actionType: actionTypes.CREATE_TASK_SUCCESS,
      payload: {
        task,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.CREATE_TASK_FAILURE,
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
    actionType: actionTypes.UPDATE_TASK,
  };
  dispatch(preAction);

  try {
    const taskResponse: ITaskResponse = await taskService.update(params);
    const task: ITask = transformTask(taskResponse);
    const action: IAction = {
      actionType: actionTypes.UPDATE_TASK_SUCCESS,
      payload: {
        task,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.UPDATE_TASK_FAILURE,
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
): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.DESTROY_TASK,
    payload: {
      task: transformTask(params),
    },
  };
  dispatch(preAction);

  try {
    await taskService.destroy(params);
    const action: IAction = {
      actionType: actionTypes.DESTROY_TASK_SUCCESS,
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.DESTROY_TASK_FAILURE,
    };
    dispatch(action);

    return action;
  }
}

export async function sortTask(
  dispatch: IDispatch,
  params: {
    id: number;
    labelId: number;
    priority: number;
  },
  to: number,
): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.SORT_TASK,
    payload: {
      task: transformTask(params),
      priority: to,
    },
  };
  dispatch(preAction);

  try {
    const taskResponses: ITaskResponse[] = await taskService.sort(params, to);
    const tasks: ITask[] = taskResponses.map(transformTask);
    const action: IAction = {
      actionType: actionTypes.SORT_TASK_SUCCESS,
      payload: {
        tasks,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.SORT_TASK_FAILURE,
    };
    dispatch(action);

    return action;
  }
}
