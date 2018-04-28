import { Store } from 'store/Store';

export interface IContainerProps {
  store: Store<IState, IAction>;
  params: {[key: string]: string};
}
