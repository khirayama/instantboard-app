import actionTypes from '../constants/action-types';
import {
  User,
} from '../services';
import {
  transformUserResponse,
} from './transforms';

export function getUser(dispatch: IDispatch) {
  const preAction: IAction = {
    type: actionTypes.GET_CURRENT_USER,
  };
  dispatch(preAction);

  return new Promise((resolve, reject) => {
    User.get().then((user: IUserResponse) => {
      const action: IAction = {
        type: actionTypes.GET_CURRENT_USER_SUCCES,
        payload: {
          profile: transformUserResponse(user),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.GET_CURRENT_USER_FAILURE,
      };
      dispatch(action);
      reject(action);
    });
  });
}
