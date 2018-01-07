import actionTypes from '../constants/action-types';
import { Member } from '../services';
import { transformUserResponse } from './transforms';

export function fetchMember(dispatch: IDispatch) {
  const preAction: IAction = {
    type: actionTypes.FETCH_MEMBER,
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Member.fetch()
      .then((requests: any) => {
        const action: IAction = {
          type: actionTypes.FETCH_MEMBER_SUCCESS,
          payload: {
            members: requests.map(transformUserResponse),
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
