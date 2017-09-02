import actionTypes from '../constants/action-types';
import {
  Label,
  Task,
} from '../services';

// Label
export function fetchLabel(dispatch) {
  const _action = {
    type: actionTypes.FETCH_LABEL,
  };
  dispatch(_action);

  return new Promise(resolve => {
    Label.fetch().then((labels: ILabel[]) => {
      const action = {
        type: actionTypes.FETCH_LABEL_SUCCESS,
        payload: {labels},
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.FETCH_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function createLabel(dispatch, label) {
  const _action = {
    type: actionTypes.CREATE_LABEL,
  };
  dispatch(_action);

  return new Promise(resolve => {
    Label.create(label).then((newLabel: ILabel) => {
      const action = {
        type: actionTypes.CREATE_LABEL_SUCCESS,
        payload: {label: newLabel},
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.CREATE_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function updateLabel(dispatch, label) {
  const _action = {
    type: actionTypes.UPDATE_LABEL,
  };
  dispatch(_action);

  return new Promise(resolve => {
    Label.update(label).then((newLabel: ILabel) => {
      const action = {
        type: actionTypes.UPDATE_LABEL_SUCCESS,
        payload: {label: newLabel},
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.UPDATE_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function destroyLabel(dispatch, label) {
  const _action = {
    type: actionTypes.DESTROY_LABEL,
    payload: {label},
  };
  dispatch(_action);

  return new Promise(resolve => {
    Label.destroy(label).then(() => {
      const action = {
        type: actionTypes.DESTROY_LABEL_SUCCESS,
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.DESTROY_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function sortLabel(dispatch, label, to) {
  const _action = {
    type: actionTypes.SORT_LABEL,
    payload: {label, priority: to},
  };
  dispatch(_action);

  return new Promise(resolve => {
    Label.sort(label, to).then((labels: ILabel[]) => {
      const action = {
        type: actionTypes.SORT_LABEL_SUCCESS,
        labels,
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
export function fetchTask(dispatch) {
  const _action = {
    type: actionTypes.FETCH_TASK,
  };
  dispatch(_action);

  return new Promise(resolve => {
    Task.fetch().then((tasks: ITask[]) => {
      const action = {
        type: actionTypes.FETCH_TASK_SUCCESS,
        payload: {tasks},
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.FETCH_TASK_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function createTask(dispatch, task) {
  const _action = {
    type: actionTypes.CREATE_TASK,
  };
  dispatch(_action);

  return new Promise(resolve => {
    Task.create(task).then((newTask: ITask) => {
      const action = {
        type: actionTypes.CREATE_TASK_SUCCESS,
        payload: {task: newTask},
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.CREATE_TASK_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function updateTask(dispatch, task) {
  const _action = {
    type: actionTypes.UPDATE_TASK,
  };
  dispatch(_action);

  return new Promise(resolve => {
    Task.update(task).then((newTask: ITask) => {
      const action = {
        type: actionTypes.UPDATE_TASK_SUCCESS,
        payload: {task: newTask},
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.UPDATE_TASK_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function destroyTask(dispatch, task) {
  const _action = {
    type: actionTypes.DESTROY_TASK,
    payload: {task},
  };
  dispatch(_action);

  return new Promise(resolve => {
    Task.destroy(task).then(() => {
      const action = {
        type: actionTypes.DESTROY_TASK_SUCCESS,
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.DESTROY_TASK_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}
