import actionTypes from '../constants/action-types';
import {
  Member,
} from '../services';
import {
  transformUserResponse,
} from './transforms';

export function fetchMember(dispatch: IDispatch) {
  const _action: IAction = {
    type: actionTypes.FETCH_MEMBER,
  };
  dispatch(_action);

  return new Promise(resolve => {
    Member.fetch().then((requests: IUserResponse[]) => {
      const action: IAction = {
        type: actionTypes.FETCH_MEMBER_SUCCESS,
        payload: {
          requests: requests.map(transformUserResponse),
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
