type IDispatch = (action: IAction) => void;

interface IAction {
  type: string;
  payload?: any;
  meta?: any;
  error?: any;
}
