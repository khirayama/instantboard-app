import actionTypes from '../constants/action-types';
import { Request } from '../services';
import { transformRequest } from './transforms';

export function pollRequest(dispatch: IDispatch, params: {status: string}): Promise<IAction> {
  return new Promise(resolve => {
    Request.fetch(params)
      .then((requests: IRequestResponse[]) => {
        const action: IAction = {
          type: actionTypes.POLL_REQUEST_SUCCESS,
          payload: {
            requests: requests.map(transformRequest),
          },
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.POLL_REQUEST_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}

export function fetchRequest(dispatch: IDispatch, params: any): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.FETCH_REQUEST,
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Request.fetch(params)
      .then((requests: IRequestResponse[]) => {
        const action: IAction = {
          type: actionTypes.FETCH_REQUEST_SUCCESS,
          payload: {
            requests: requests.map(transformRequest),
          },
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.FETCH_REQUEST_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}

export function createRequest(dispatch: IDispatch, params: any): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.CREATE_REQUEST,
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Request.create(params)
      .then((request: IRequestResponse) => {
        const action = {
          type: actionTypes.CREATE_REQUEST_SUCCESS,
          payload: {
            request: transformRequest(request),
          },
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.CREATE_REQUEST_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}

export function updateRequest(dispatch: IDispatch, params: any): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.UPDATE_REQUEST,
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Request.update(params)
      .then((request: IRequestResponse) => {
        const action = {
          type: actionTypes.UPDATE_REQUEST_SUCCESS,
          payload: {
            request: transformRequest(request),
          },
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.UPDATE_REQUEST_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}

export function destroyRequest(dispatch: IDispatch, params: any): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.DESTROY_REQUEST,
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Request.destroy(params)
      .then((request: IRequestResponse) => {
        const action = {
          type: actionTypes.DESTROY_REQUEST_SUCCESS,
          payload: {
            request: transformRequest(request),
          },
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.DESTROY_REQUEST_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}
