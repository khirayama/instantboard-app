import { transformLabel } from 'action-creators/transforms';
import { actionTypes } from 'constants/actionTypes';
import { labelService } from 'services/labelService';

export async function fetchLabel(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.FETCH_LABEL,
  };
  dispatch(preAction);

  try {
    const labelResponses: ILabelResponse[] = await labelService.fetch();
    const labels: ILabel[] = labelResponses.map(transformLabel);
    const action: IAction = {
      actionType: actionTypes.FETCH_LABEL_SUCCESS,
      payload: {
        labels,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.FETCH_LABEL_FAILURE,
    };
    dispatch(action);

    return action;
  }
}

export async function createLabel(dispatch: IDispatch, label: { name: string }): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.CREATE_LABEL,
  };
  dispatch(preAction);

  try {
    const labelResponse: ILabelResponse = await labelService.create(label);
    const newLabel: ILabel = transformLabel(labelResponse);
    const action: IAction = {
      actionType: actionTypes.CREATE_LABEL_SUCCESS,
      payload: {
        label: newLabel,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.CREATE_LABEL_FAILURE,
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
    actionType: actionTypes.UPDATE_LABEL,
  };
  dispatch(preAction);

  try {
    const labelResponse: ILabelResponse = await labelService.update(label);
    const newLabel: ILabel = transformLabel(labelResponse);
    const action: IAction = {
      actionType: actionTypes.UPDATE_LABEL_SUCCESS,
      payload: {
        label: newLabel,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.UPDATE_LABEL_FAILURE,
    };
    dispatch(action);

    return action;
  }
}

export async function destroyLabel(dispatch: IDispatch, label: { id: number }): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.DESTROY_LABEL,
    payload: {
      label: transformLabel(label),
    },
  };
  dispatch(preAction);

  try {
    await labelService.destroy(label);
    const action: IAction = {
      actionType: actionTypes.DESTROY_LABEL_SUCCESS,
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.DESTROY_LABEL_FAILURE,
    };
    dispatch(action);

    return action;
  }
}

export async function sortLabel(dispatch: IDispatch, label: { id: number }, to: number): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.SORT_LABEL,
    payload: {
      label: transformLabel(label),
      priority: to,
    },
  };
  dispatch(preAction);

  try {
    const labelResponses: ILabelResponse[] = await labelService.sort(label, to);
    const labels: ILabel[] = labelResponses.map(transformLabel);
    const action: IAction = {
      actionType: actionTypes.SORT_LABEL_SUCCESS,
      payload: {
        labels,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.SORT_LABEL_FAILURE,
    };
    dispatch(action);

    return action;
  }
}
