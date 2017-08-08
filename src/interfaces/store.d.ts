interface IStore {
  getState: () => IState;
  dispatch: (action: IAction) => void;
  addChangeListener: (listener: any) => void;
  removeChangeListener: (listener: any) => void;
}
