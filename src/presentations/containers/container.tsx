import * as React from 'react';

export default class Container<P extends IContainerProps, S extends IState> extends React.Component<any, any> {
  protected handleStateUpdate: any;

  protected dispatch: (action: IAction) => void;

  protected actions: any;

  constructor(props: P) {
    super(props);

    this.handleStateUpdate = () => {
      this.setState(props.store.getState());
    };
    this.state = props.store.getState();
    this.dispatch = props.store.dispatch.bind(props.store);
  }

  public componentWillMount() {
    const {store} = this.props;

    store.addChangeListener(this.handleStateUpdate);
  }

  public componentWillUnmount() {
    const {store} = this.props;

    store.removeChangeListener(this.handleStateUpdate);
  }
}
