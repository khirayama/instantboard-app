import * as deepAssign from 'deep-assign';
import actionTypes from '../constants/action-types';

export default function (state: IState, action: IAction): IState {
  const newState: IState = deepAssign({}, state);
  const payload = action.payload;

  switch (action.type) {
    // LABEL
    case (actionTypes.FETCH_LABEL): {
      newState.ui.isLoadingLabels = true;
      break;
    }
    case (actionTypes.FETCH_LABEL_SUCCESS): {
      newState.labels = payload.labels;
      newState.ui.isLoadingLabels = false;
      break;
    }
    case (actionTypes.FETCH_LABEL_FAILURE): {
      newState.ui.isLoadingLabels = false;
      break;
    }

    case (actionTypes.CREATE_LABEL): {
      newState.ui.isLoadingLabels = true;
      break;
    }
    case (actionTypes.CREATE_LABEL_SUCCESS): {
      newState.labels.push(payload.label);
      newState.ui.isLoadingLabels = false;
      break;
    }
    case (actionTypes.CREATE_LABEL_FAILURE): {
      newState.ui.isLoadingLabels = false;
      break;
    }

    case (actionTypes.UPDATE_LABEL): {
      newState.ui.isLoadingLabels = true;
      break;
    }
    case (actionTypes.UPDATE_LABEL_SUCCESS): {
      newState.labels = newState.labels.map((label: ILabel) => {
        if (label.id === payload.label.id) {
          return payload.label;
        }
        return label;
      });
      newState.ui.isLoadingLabels = false;
      break;
    }
    case (actionTypes.UPDATE_LABEL_FAILURE): {
      newState.ui.isLoadingLabels = false;
      break;
    }

    case (actionTypes.DESTROY_LABEL): {
      newState.labels = newState.labels.filter((label: ILabel) => {
        return (label.id !== payload.label.id);
      });
      newState.ui.isLoadingLabels = true;
      break;
    }
    case (actionTypes.DESTROY_LABEL_SUCCESS): {
      newState.ui.isLoadingLabels = false;
      break;
    }
    case (actionTypes.DESTROY_LABEL_FAILURE): {
      newState.ui.isLoadingLabels = false;
      break;
    }

    case (actionTypes.SORT_LABEL): {
      // Uncomfortable to immediate update UI.
      newState.labels = (() => {
        let labels = state.labels;
        const label = payload.label;
        const priority = payload.priority;

        if (label.priority > priority) {
          labels = labels.map(label_ => {
            if (label_.priority === label.priority) {
              label_.priority = priority;
            } else if (
              (priority <= label_.priority) &&
              (label_.priority < label.priority)
            ) {
              label_.priority += 1;
            }
            return label_;
          });
        } else if (label.priority < priority) {
          labels = labels.map(label_ => {
            if (label_.priority === label.priority) {
              label_.priority = priority;
            } else if (
              (label.priority < label_.priority) &&
              (label_.priority <= priority)
            ) {
              label_.priority -= 1;
            }
            return label_;
          });
        }

        return labels.sort((x, y) => {
          if (x.priority > y.priority) {
            return 1;
          } else if (x.priority < y.priority) {
            return -1;
          }
          return 0;
        });
      })();
      newState.ui.isLoadingLabels = true;
      break;
    }
    case (actionTypes.SORT_LABEL_SUCCESS): {
      newState.labels = payload.labels;
      newState.ui.isLoadingLabels = false;
      break;
    }
    case (actionTypes.SORT_LABEL_FAILURE): {
      newState.ui.isLoadingLabels = false;
      break;
    }

    // TASK
    case (actionTypes.FETCH_TASK): {
      newState.ui.isLoadingTasks = true;
      break;
    }
    case (actionTypes.FETCH_TASK_SUCCESS): {
      newState.tasks = payload.tasks;
      newState.ui.isLoadingTasks = false;
      break;
    }
    case (actionTypes.FETCH_TASK_FAILURE): {
      newState.ui.isLoadingTasks = false;
      break;
    }

    case (actionTypes.CREATE_TASK): {
      newState.ui.isLoadingTasks = true;
      break;
    }
    case (actionTypes.CREATE_TASK_SUCCESS): {
      newState.tasks.push(payload.task);
      newState.ui.isLoadingTasks = false;
      break;
    }
    case (actionTypes.CREATE_TASK_FAILURE): {
      newState.ui.isLoadingTasks = false;
      break;
    }

    case (actionTypes.UPDATE_TASK): {
      newState.ui.isLoadingTasks = true;
      break;
    }
    case (actionTypes.UPDATE_TASK_SUCCESS): {
      newState.tasks = newState.tasks.map((task: ITask) => {
        if (task.id === payload.task.id) {
          return payload.task;
        }
        return task;
      });
      newState.ui.isLoadingTasks = false;
      break;
    }
    case (actionTypes.UPDATE_TASK_FAILURE): {
      newState.ui.isLoadingTasks = false;
      break;
    }

    case (actionTypes.DESTROY_TASK): {
      newState.tasks = newState.tasks.filter((task: ITask) => {
        return (task.id !== payload.task.id);
      });
      newState.ui.isLoadingTasks = true;
      break;
    }
    case (actionTypes.DESTROY_TASK_SUCCESS): {
      newState.ui.isLoadingTasks = false;
      break;
    }
    case (actionTypes.DESTROY_TASK_FAILURE): {
      newState.ui.isLoadingTasks = false;
      break;
    }

    default: {
      break;
    }
  }

  return newState;
}
