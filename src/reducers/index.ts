import * as deepAssign from 'deep-assign';
import actionTypes from '../constants/action-types';

export default function (state: IState, action: IAction): IState {
  const newState: IState = deepAssign({}, state);
  const payload = action.payload;
  // Const meta = action.meta;

  switch (action.type) {
    case (actionTypes.FETCH_LABEL): {
      newState.labels = payload.labels;
      newState.ui.isLoadingLabels = payload.isLoadingLabels;
      break;
    }
    case (actionTypes.FETCH_LABEL_SUCCESS): {
      newState.labels = payload.labels;
      newState.ui.isLoadingLabels = payload.isLoadingLabels;
      break;
    }
    case (actionTypes.CREATE_LABEL): {
      newState.labels.push(payload.label);
      newState.ui.isLoadingLabelCids.push(payload.label.cid);
      break;
    }
    case (actionTypes.CREATE_LABEL_SUCCESS): {
      newState.labels.push(payload.label);
      newState.ui.isLoadingLabelCids = newState.ui.isLoadingLabelCids.filter((cid: string) => (cid !== payload.label.cid));
      break;
    }
    case (actionTypes.UPDATE_LABEL): {
      newState.labels = newState.labels.map((label: ILabel) => {
        if (label.cid === payload.label.cid) {
          return payload.label;
        }
        return label;
      });
      newState.ui.isLoadingLabelCids.push(payload.label.cid);
      break;
    }
    case (actionTypes.UPDATE_LABEL_SUCCESS): {
      newState.labels = newState.labels.map((label: ILabel) => {
        if (label.cid === payload.label.cid) {
          return payload.label;
        }
        return label;
      });
      newState.ui.isLoadingLabelCids = newState.ui.isLoadingLabelCids.filter((cid: string) => (cid !== payload.label.cid));
      break;
    }
    case (actionTypes.DESTROY_LABEL): {
      newState.labels = payload.labels;
      break;
    }
    case (actionTypes.DESTROY_LABEL_SUCCESS): {
      newState.ui.isLoadingLabelCids = newState.ui.isLoadingLabelCids.filter((cid: string) => (cid !== payload.label.cid));
      break;
    }
    case (actionTypes.SORT_LABEL): {
      newState.labels = payload.labels;
      break;
    }
    case (actionTypes.SORT_LABEL_SUCCESS): {
      break;
    }
    case (actionTypes.SORT_LABEL_FAILURE): {
      break;
    }
    default: {
      break;
    }
  }

  return newState;
}
