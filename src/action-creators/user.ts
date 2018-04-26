import { transformMember, transformUser } from 'action-creators/transforms';
import { actionTypes } from 'constants/actionTypes';
import { userService } from 'services/userService';

export async function getUser(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.GET_USER,
  };
  dispatch(preAction);

  try {
    const userReponse: IUserResponse = await userService.get();
    const user: IUser = transformUser(userReponse);
    const action: IAction = {
      actionType: actionTypes.GET_USER_SUCCES,
      payload: {
        profile: user,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.GET_USER_FAILURE,
    };
    dispatch(action);

    return action;
  }
}

export async function deleteUser(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.DELETE_USER,
  };
  dispatch(preAction);

  try {
    await userService.delete();
    const action: IAction = {
      actionType: actionTypes.DELETE_USER_SUCCES,
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.DELETE_USER_FAILURE,
    };
    dispatch(action);

    return action;
  }
}

export async function fetchMember(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    actionType: actionTypes.FETCH_MEMBER,
  };
  dispatch(preAction);

  try {
    const memberResponses: IMemberResponse[] = await userService.fetchMember();
    const members: IMember[] = memberResponses.map(transformMember);
    const action: IAction = {
      actionType: actionTypes.FETCH_MEMBER_SUCCESS,
      payload: {
        members,
      },
    };
    dispatch(action);

    return action;
  } catch (err) {
    const action: IAction = {
      actionType: actionTypes.FETCH_MEMBER_FAILURE,
    };
    dispatch(action);

    return action;
  }
}
