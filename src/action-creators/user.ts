import actionTypes from '../constants/action-types';
import { User } from '../services';
import { transformUserResponse } from './transforms';

export function getUser(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.GET_USER,
  };
  dispatch(preAction);

  return new Promise((resolve, reject) => {
    User.get()
      .then((user: IUserResponse) => {
        const action: IAction = {
          type: actionTypes.GET_USER_SUCCES,
          payload: {
            profile: transformUserResponse(user),
          },
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.GET_USER_FAILURE,
        };
        dispatch(action);
        reject(action);
      });
  });
}

export function deleteUser(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.DELETE_USER,
  };
  dispatch(preAction);

  return new Promise((resolve, reject) => {
    User.delete()
      .then(() => {
        const action: IAction = {
          type: actionTypes.DELETE_USER_SUCCES,
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.DELETE_USER_FAILURE,
        };
        dispatch(action);
        reject(action);
      });
  });
}

export function fetchMember(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.FETCH_MEMBER,
  };
  dispatch(preAction);

  return new Promise(resolve => {
    User.fetchMember()
      .then((members: IUserResponse[]) => {
        const action: IAction = {
          type: actionTypes.FETCH_MEMBER_SUCCESS,
          payload: {
            members: members.map(transformUserResponse),
          },
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.FETCH_MEMBER_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}
