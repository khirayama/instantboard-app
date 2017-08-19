import * as React from 'react';

export default class Container<P extends IContainerProps, S extends IState> extends React.Component<any, any> {
  protected dispatch: (action: IAction) => void;

  protected actions: any;

  constructor(props: P) {
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
