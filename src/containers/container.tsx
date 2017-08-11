import * as React from 'react';

export default class Container extends React.Component<IContainerProps, IState> {
  protected dispatch: (action: IAction) => void;

  constructor(props: IContainerProps) {
    super(props);

    this.state = props.store.getState();
    this.dispatch = props.store.dispatch.bind(props.store);
  }

  public componentWillMount() {
    const store = this.props.store;

    store.addChangeListener(() => {
      this.setState(store.getState());
    });
  }
}
