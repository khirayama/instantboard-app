import actionTypes from '../constants/action-types';
import User from '../services/User';
import { transformMember, transformUser } from './transforms';

export async function getUser(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.GET_USER
  };
  dispatch(preAction);

  try {
    const userReponse: IUserResponse = await User.get();
    const user = transformUser(userReponse);
    const action: IAction = {
      type: actionTypes.GET_USER_SUCCES,
      payload: {
        profile: user
      }
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.GET_USER_FAILURE
    };
    dispatch(action);
    return action;
  }
}

export async function deleteUser(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.DELETE_USER
  };
  dispatch(preAction);

  try {
    await User.delete();
    const action: IAction = {
      type: actionTypes.DELETE_USER_SUCCES
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.DELETE_USER_FAILURE
    };
    dispatch(action);
    return action;
  }
}

export async function fetchMember(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.FETCH_MEMBER
  };
  dispatch(preAction);

  try {
    const memberResponses: IMemberResponse[] = await User.fetchMember();
    const members: IMember[] = memberResponses.map(transformMember);
    const action: IAction = {
      type: actionTypes.FETCH_MEMBER_SUCCESS,
      payload: {
        members
      }
    };
    dispatch(action);
    return action;
  } catch (err) {
    const action: IAction = {
      type: actionTypes.FETCH_MEMBER_FAILURE
    };
    dispatch(action);
    return action;
  }
}
