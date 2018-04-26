type IDispatch = (action: IAction) => void;

interface IAction {
  actionType: string;
  payload?: any;
  meta?: any;
  error?: any;
}
