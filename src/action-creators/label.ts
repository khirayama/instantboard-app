import { labelService } from 'services/labelService';
import actionTypes from '../constants/action-types';
import { transformLabel } from './transforms';

export async function fetchLabel(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.FETCH_LABEL,
  };
  dispatch(preAction);

  try {
    const labelResponses: ILabelResponse[] = await labelService.fetch();
    const labels: ILabel[] = labelResponses.map(transformLabel);
    const action: IAction = {
      type: actionTypes.FETCH_LABEL_SUCCESS,
      payload: {
        labels,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.FETCH_LABEL_FAILURE,
    };
    dispatch(action);
    return action;
  }
}

export async function createLabel(dispatch: IDispatch, label: { name: string }): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.CREATE_LABEL,
  };
  dispatch(preAction);

  try {
    const labelResponse: ILabelResponse = await labelService.create(label);
    const newLabel: ILabel = transformLabel(labelResponse);
    const action: IAction = {
      type: actionTypes.CREATE_LABEL_SUCCESS,
      payload: {
        label: newLabel,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.CREATE_LABEL_FAILURE,
    };
    dispatch(action);
    return action;
  }
}

export async function updateLabel(
  dispatch: IDispatch,
  label: { id: number; name: string; visibled: boolean },
): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.UPDATE_LABEL,
  };
  dispatch(preAction);

  try {
    const labelResponse: ILabelResponse = await labelService.update(label);
    const newLabel: ILabel = transformLabel(labelResponse);
    const action: IAction = {
      type: actionTypes.UPDATE_LABEL_SUCCESS,
      payload: {
        label: newLabel,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.UPDATE_LABEL_FAILURE,
    };
    dispatch(action);
    return action;
  }
}

export async function destroyLabel(dispatch: IDispatch, label: { id: number }): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.DESTROY_LABEL,
    payload: {
      label: transformLabel(label),
    },
  };
  dispatch(preAction);

  try {
    await labelService.destroy(label);
    const action: IAction = {
      type: actionTypes.DESTROY_LABEL_SUCCESS,
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.DESTROY_LABEL_FAILURE,
    };
    dispatch(action);
    return action;
  }
}

export async function sortLabel(dispatch: IDispatch, label: { id: number }, to: number): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.SORT_LABEL,
    payload: {
      label: transformLabel(label),
      priority: to,
    },
  };
  dispatch(preAction);

  try {
    const labelResponses: ILabelResponse[] = await labelService.sort(label, to);
    const labels = labelResponses.map(transformLabel);
    const action: IAction = {
      type: actionTypes.SORT_LABEL_SUCCESS,
      payload: {
        labels,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action = {
      type: actionTypes.SORT_LABEL_FAILURE,
    };
    dispatch(action);
    return action;
  }
}
