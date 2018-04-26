import { transformRequest } from 'action-creators/transforms';
import { actionTypes } from 'constants/actionTypes';
import { requestService } from 'services/requestService';

export async function pollRequest(dispatch: IDispatch, params: { status: string }): Promise<IAction> {
  try {
    const requestResponses: IRequestResponse[] = await requestService.fetch(params);
    const requests: IRequest[] = requestResponses.map(transformRequest);
    const action: IAction = {
      actionType: actionTypes.POLL_REQUEST_SUCCESS,
      payload: {
        requests,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.POLL_REQUEST_FAILURE,
    };
    dispatch(action);

    return action;
  }
}

export async function fetchRequest(dispatch: IDispatch, params: { status: string }): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.FETCH_REQUEST,
  };
  dispatch(preAction);

  try {
    const requestResponses: IRequestResponse[] = await requestService.fetch(params);
    const requests: IRequest[] = requestResponses.map(transformRequest);
    const action: IAction = {
      actionType: actionTypes.FETCH_REQUEST_SUCCESS,
      payload: {
        requests,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.FETCH_REQUEST_FAILURE,
    };
    dispatch(action);

    return action;
  }
}

export async function createRequest(
  dispatch: IDispatch,
  params: { labelId: number; memberId: number },
): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.CREATE_REQUEST,
  };
  dispatch(preAction);

  try {
    const requestResponse: IRequestResponse = await requestService.create(params);
    const request: IRequest = transformRequest(requestResponse);
    const action: IAction = {
      actionType: actionTypes.CREATE_REQUEST_SUCCESS,
      payload: {
        request,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.CREATE_REQUEST_FAILURE,
    };
    dispatch(action);

    return action;
  }
}

export async function updateRequest(
  dispatch: IDispatch,
  params: {
    id: number;
    labelId: number;
    memberId: number;
    status?: string;
  },
): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.UPDATE_REQUEST,
  };
  dispatch(preAction);

  try {
    const requestResponse: IRequestResponse = await requestService.update(params);
    const request: IRequest = transformRequest(requestResponse);
    const action: IAction = {
      actionType: actionTypes.UPDATE_REQUEST_SUCCESS,
      payload: {
        request,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.UPDATE_REQUEST_FAILURE,
    };
    dispatch(action);

    return action;
  }
}

export async function destroyRequest(dispatch: IDispatch, params: { id: number }): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.DESTROY_REQUEST,
  };
  dispatch(preAction);

  try {
    const requestResponse: IRequestResponse = await requestService.destroy(params);
    const request: IRequest = transformRequest(requestResponse);
    const action: IAction = {
      actionType: actionTypes.DESTROY_REQUEST_SUCCESS,
      payload: {
        request,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.DESTROY_REQUEST_FAILURE,
    };
    dispatch(action);

    return action;
  }
}
