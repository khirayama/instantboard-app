import actionTypes from '../constants/action-types';
import {
  User,
} from '../services';
import {
  transformUser,
} from './transforms';

export function getUser(dispatch: IDispatch) {
  const _action: IAction = {
    type: actionTypes.GET_CURRENT_USER,
  };
  dispatch(_action);

  return new Promise((resolve, reject) => {
    User.get().then((user: IUserResponse) => {
      const action: IAction = {
        type: actionTypes.GET_CURRENT_USER_SUCCES,
        payload: {
          profile: transformUser(user),
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
