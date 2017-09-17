import actionTypes from '../constants/action-types';
import {
  Label,
  Member,
  Request,
  Task,
  User,
} from '../services';
import {
  transformUser,
} from './transforms';

export function fetchMember(dispatch: IDispatch) {
  const _action: IAction = {
    type: actionTypes.FETCH_MEMBER,
  };
  dispatch(_action);

  return new Promise((resolve) => {
    Member.fetch().then((requests: IUserResponse[]) => {
      const action: IAction = {
        type: actionTypes.FETCH_MEMBER_SUCCESS,
        payload: {
          requests: requests.map(transformUser),
        },
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action: IAction = {
        type: actionTypes.FETCH_MEMBER_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}
