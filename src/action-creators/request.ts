import actionTypes from '../constants/action-types';
import Request from '../services/request';
import { transformRequest } from './transforms';

export async function pollRequest(dispatch: IDispatch, params: { status: string }): Promise<IAction> {
  try {
    const requestResponses: IRequestResponse[] = await Request.fetch(params);
    const requests: IRequest[] = requestResponses.map(transformRequest);
    const action: IAction = {
      type: actionTypes.POLL_REQUEST_SUCCESS,
      payload: {
        requests,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.POLL_REQUEST_FAILURE,
    };
    dispatch(action);
    return action;
  }
}

export async function fetchRequest(dispatch: IDispatch, params: { status: string }): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.FETCH_REQUEST,
  };
  dispatch(preAction);

  try {
    const requestResponses: IRequestResponse[] = await Request.fetch(params);
    const requests: IRequest[] = requestResponses.map(transformRequest);
    const action: IAction = {
      type: actionTypes.FETCH_REQUEST_SUCCESS,
      payload: {
        requests,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.FETCH_REQUEST_FAILURE,
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
    type: actionTypes.CREATE_REQUEST,
  };
  dispatch(preAction);

  try {
    const requestResponse: IRequestResponse = await Request.create(params);
    const request: IRequest = transformRequest(requestResponse);
    const action = {
      type: actionTypes.CREATE_REQUEST_SUCCESS,
      payload: {
        request,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.CREATE_REQUEST_FAILURE,
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
    type: actionTypes.UPDATE_REQUEST,
  };
  dispatch(preAction);

  try {
    const requestResponse: IRequestResponse = await Request.update(params);
    const request: IRequest = transformRequest(requestResponse);
    const action = {
      type: actionTypes.UPDATE_REQUEST_SUCCESS,
      payload: {
        request,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.UPDATE_REQUEST_FAILURE,
    };
    dispatch(action);
    return action;
  }
}

export async function destroyRequest(dispatch: IDispatch, params: { id: number }): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.DESTROY_REQUEST,
  };
  dispatch(preAction);

  try {
    const requestResponse: IRequestResponse = await Request.destroy(params);
    const request: IRequest = transformRequest(requestResponse);
    const action = {
      type: actionTypes.DESTROY_REQUEST_SUCCESS,
      payload: {
        request,
      },
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.DESTROY_REQUEST_FAILURE,
    };
    dispatch(action);
    return action;
  }
}
