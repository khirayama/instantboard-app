import * as deepAssign from 'deep-assign';
import actionTypes from '../constants/action-types';

export default function (state: IState, action: IAction): IState {
  const newState: IState = deepAssign({}, state);
  const payload = action.payload;
  const meta = action.meta;
  console.log(actionTypes, payload, meta);

  return newState;
}
