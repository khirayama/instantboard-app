import * as React from 'react';

interface IContainerProps {
  store: IStore;
  params: any;
}

export default class Container extends React.Component<IContainerProps, IState> {
  protected dispatch: (action: IAction) => void;

  public componentWillMount() {
    const store = this.props.store;

    store.addChangeListener(() => {
      this.setState(store.getState());
    });
  }

  constructor(props: IContainerProps) {
    super(props);

    this.state = props.store.getState();
    this.dispatch = props.store.dispatch.bind(props.store);
  }
}
