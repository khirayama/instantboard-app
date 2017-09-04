import actionTypes from '../constants/action-types';
import {
  Label,
  Task,
} from '../services';

function transformSchedule(schedule: any): ISchedule|null {
  if (schedule === null) {
    return null;
  }

  return {
    shortMonthName: schedule.shortMonthName,
    shortDayName: schedule.shortDayName,
    date: schedule.date,
  };
}

function transformTask(task: ITaskRequest|ITaskResponse): ITask {
  return {
    id: String(task.id || ''),
    labelId: String(task.labelId || ''),
    text: task.text || '',
    priority: task.priority || 0,
    completed: (task.completed) ? true : false,
    schedule: transformSchedule(task.schedule) || null,
  };
}

function transformLabel(label: ILabelRequest|ILabelResponse): ILabel {
  return {
    id: String(label.id || ''),
    name: label.name || '',
    visibled: (label.visibled) ? true : false,
    priority: label.priority || 0,
    members: label.members || [],
  };
}

// Label
export function fetchLabel(dispatch: IDispatch) {
  const _action: IAction = {
    type: actionTypes.FETCH_LABEL,
  };
  dispatch(_action);

  return new Promise(resolve => {
    Label.fetch().then((labels: ILabelResponse[]) => {
      const action: IAction = {
        type: actionTypes.FETCH_LABEL_SUCCESS,
        payload: {
          labels: labels.map(transformLabel),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.FETCH_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function createLabel(dispatch: IDispatch, label: ILabelRequest) {
  const _action: IAction = {
    type: actionTypes.CREATE_LABEL,
  };
  dispatch(_action);

  return new Promise(resolve => {
    Label.create(label).then((newLabel: ILabelResponse) => {
      const action: IAction = {
        type: actionTypes.CREATE_LABEL_SUCCESS,
        payload: {
          label: transformLabel(newLabel),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.CREATE_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function updateLabel(dispatch: IDispatch, label: ILabelRequest) {
  const _action: IAction = {
    type: actionTypes.UPDATE_LABEL,
  };
  dispatch(_action);

  return new Promise(resolve => {
    Label.update(label).then((newLabel: ILabelResponse) => {
      const action: IAction = {
        type: actionTypes.UPDATE_LABEL_SUCCESS,
        payload: {
          label: transformLabel(newLabel),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.UPDATE_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function destroyLabel(dispatch: IDispatch, label: ILabelRequest) {
  const _action: IAction = {
    type: actionTypes.DESTROY_LABEL,
    payload: {
      label: transformLabel(label),
    },
  };
  dispatch(_action);

  return new Promise(resolve => {
    Label.destroy(label).then(() => {
      const action: IAction = {
        type: actionTypes.DESTROY_LABEL_SUCCESS,
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.DESTROY_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function sortLabel(dispatch: IDispatch, label: ILabelRequest, to: number) {
  const _action: IAction = {
    type: actionTypes.SORT_LABEL,
    payload: {
      label: transformLabel(label),
      priority: to,
    },
  };
  dispatch(_action);

  return new Promise(resolve => {
    Label.sort(label, to).then((labels: ILabelResponse[]) => {
      const action: IAction = {
        type: actionTypes.SORT_LABEL_SUCCESS,
        payload: {
          labels: labels.map(transformLabel),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.SORT_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

// Task
export function fetchTask(dispatch: IDispatch) {
  const _action: IAction = {
    type: actionTypes.FETCH_TASK,
  };
  dispatch(_action);

  return new Promise(resolve => {
    Task.fetch().then((tasks: ITaskResponse[]) => {
      const action: IAction = {
        type: actionTypes.FETCH_TASK_SUCCESS,
        payload: {
          tasks: tasks.map(transformTask),
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

  return new Promise(resolve => {
    Task.create(task).then((newTask: ITaskResponse) => {
      const action: IAction = {
        type: actionTypes.CREATE_TASK_SUCCESS,
        payload: {
          task: transformTask(newTask),
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

  return new Promise(resolve => {
    Task.update(task).then((newTask: ITaskResponse) => {
      const action: IAction = {
        type: actionTypes.UPDATE_TASK_SUCCESS,
        payload: {
          task: transformTask(newTask),
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
      task: transformTask(task),
    },
  };
  dispatch(_action);

  return new Promise(resolve => {
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
