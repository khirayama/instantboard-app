import actionTypes from '../constants/action-types';
import {
  Label,
  Task,
  Member,
  Request,
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
    content: task.content || '',
    priority: task.priority || 0,
    completed: (task.completed) ? true : false,
    schedule: transformSchedule(task.schedule) || null,
  };
}

function transformUser(user: IUserRequest|IUserResponse): IUser {
  return {
    id: String(user.id || ''),
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

  return new Promise((resolve, reject) => {
    Label.create(label).then((newLabel: ILabelResponse) => {
      const newLabel_ = transformLabel(newLabel);
      const action: IAction = {
        type: actionTypes.CREATE_LABEL_SUCCESS,
        payload: {
          label: newLabel_,
        },
      };
      dispatch(action);

      if (label.members.length) {
        let result: any = {
          label: newLabel_,
          members: [],
        };
        label.members.forEach((member: any) => {
          const requestHandler = (success: any, res: any) => {
            result.members.push({
              success,
              labelId: newLabel_.id,
              name: member.name,
              errors: (success) ? [] : [res.error],
            });

            if (result.members.length === label.members.length) {
              if (
                result.members.length ===
                result.members.filter((result_: any) => result_.success).length
              ) {
                resolve(result);
              } else {
                reject(result);
              }
            }
          };
          Request.create({
            labelId: newLabel_.id,
            memberName: member.name,
          }).then((res) => {
            requestHandler(true, res);
          }).catch((res) => {
            requestHandler(false, res);
          });
        });
      } else {
        resolve(action);
      }
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

  return new Promise((resolve, reject) => {
    Label.update(label).then((newLabel: ILabelResponse) => {
      const newLabel_ = transformLabel(newLabel);
      const action: IAction = {
        type: actionTypes.UPDATE_LABEL_SUCCESS,
        payload: {
          label: newLabel_,
        },
      };
      dispatch(action);

      if (label.members) {
        let result: any = {
          label: newLabel_,
          members: [],
        };
        label.members.forEach((member: any) => {
          const requestHandler = (success: any, res: any) => {
            result.members.push({
              success,
              labelId: newLabel_.id,
              name: member.name,
              errors: (success) ? [] : [res.error],
            });

            if (result.members.length === label.members.length) {
              if (
                result.members.length ===
                result.members.filter((result_: any) => result_.success).length
              ) {
                resolve(result);
              } else {
                reject(result);
              }
            }
          };
          Request.create({
            labelId: newLabel_.id,
            memberName: member.name,
          }).then((res) => {
            requestHandler(true, res);
          }).catch((res) => {
            requestHandler(false, res);
          });
        });
      }
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

export function sortTask(dispatch: IDispatch, task: ITaskRequest, to: number) {
  const _action: IAction = {
    type: actionTypes.SORT_TASK,
    payload: {
      task: transformTask(task),
      priority: to,
    },
  };
  dispatch(_action);

  return new Promise(resolve => {
    Task.sort(task, to).then((tasks: ITaskResponse[]) => {
      const action: IAction = {
        type: actionTypes.SORT_TASK_SUCCESS,
        payload: {
          tasks: tasks.map(transformTask),
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

export function fetchMember(dispatch: IDispatch) {
  const _action: IAction = {
    type: actionTypes.FETCH_MEMBER,
  };
  dispatch(_action);

  return new Promise(resolve => {
    Member.fetch().then((members: IUserResponse[]) => {
      const action: IAction = {
        type: actionTypes.FETCH_MEMBER_SUCCESS,
        payload: {
          members: members.map(transformUser),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.FETCH_MEMBER_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}
