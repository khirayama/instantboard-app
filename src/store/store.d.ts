interface IDispatch {
  (action: IAction): void;
}

interface IStore {
  getState: () => IState;
  dispatch: IDispatch;
  addChangeListener: (listener: any) => void;
  removeChangeListener: (listener: any) => void;
}
