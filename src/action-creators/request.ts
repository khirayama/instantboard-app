import actionTypes from '../constants/action-types';
import {
  Request,
} from '../services';
import {
  transformRequestResponse,
} from './transforms';

export function fetchRequest(dispatch: IDispatch, params) {
  const preAction: IAction = {
    type: actionTypes.FETCH_REQUEST,
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Request.fetch(params).then((requests: IRequestResponse[]) => {
      const action: IAction = {
        type: actionTypes.FETCH_REQUEST_SUCCESS,
        payload: {
          requests: requests.map(transformRequestResponse),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.FETCH_REQUEST_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function updateRequest(dispatch: IDispatch, params) {
  const preAction: IAction = {
    type: actionTypes.UPDATE_REQUEST,
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Request.update(params).then((request: IRequestResponse) => {
      const action = {
        type: actionTypes.UPDATE_REQUEST_SUCCESS,
        payload: {
          request: transformRequestResponse(request),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.UPDATE_REQUEST_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}
