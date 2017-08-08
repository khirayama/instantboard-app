import * as React from 'react';

interface IContainerProps {
  store: IStore;
}

export default class Container extends React.Component<IContainerProps, IState> {
  protected dispatch: (action: IAction) => void;

  constructor(props: IContainerProps) {
    super(props);

    this.state = props.store.getState();
    this.dispatch = props.store.dispatch.bind(props.store);
  }
}
