interface IStore {
  getState: () => IState;
  dispatch: IDispatch;
  addChangeListener: (listener: () => void) => void;
  removeChangeListener: (listener: () => void) => void;
}
