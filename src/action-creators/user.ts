import actionTypes from '../constants/action-types';
import {User} from '../services';
import {transformUserResponse} from './transforms';

export function getUser(dispatch: IDispatch) {
  const preAction: IAction = {
    type: actionTypes.GET_USER,
  };
  dispatch(preAction);

  return new Promise((resolve, reject) => {
    User.get().then((user: any) => {
      const action: IAction = {
        type: actionTypes.GET_USER_SUCCES,
        payload: {
          profile: transformUserResponse(user),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.GET_USER_FAILURE,
      };
      dispatch(action);
      reject(action);
    });
  });
}

export function updateUser(dispatch: IDispatch, user: IUserRequest) {
  const preAction: IAction = {
    type: actionTypes.UPDATE_USER,
    payload: {
      profile: user,
    },
  };
  dispatch(preAction);

  return new Promise((resolve, reject) => {
    User.update(user).then((newUser: any) => {
      const action: IAction = {
        type: actionTypes.UPDATE_USER_SUCCES,
        payload: {
          profile: transformUserResponse(newUser),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.UPDATE_USER_FAILURE,
      };
      dispatch(action);
      reject(action);
    });
  });
}

export function deleteUser(dispatch: IDispatch) {
  const preAction: IAction = {
    type: actionTypes.DELETE_USER,
  };
  dispatch(preAction);

  return new Promise((resolve, reject) => {
    User.delete().then(() => {
      const action: IAction = {
        type: actionTypes.DELETE_USER_SUCCES,
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.DELETE_USER_FAILURE,
      };
      dispatch(action);
      reject(action);
    });
  });
}
