import * as deepEqual from 'deep-equal';
import * as React from 'react';

export default class Container<P, S> extends React.Component<P & IContainerProps, S & IState> {
  protected handleStateUpdate: () => void;

  protected dispatch: IDispatch;

  protected actions: any = {};

  constructor(props: P & IContainerProps) {
    super(props);

    this.handleStateUpdate = (): void => {
      this.setState(props.store.getState());
    };
    this.dispatch = props.store.dispatch.bind(props.store);
  }

  public shouldComponentUpdate(prevProps: IContainerProps, prevState: IState) {
    return !deepEqual(this.props, prevProps) || !deepEqual(this.state, prevState);
  }

  public componentWillMount() {
    const { store }: { store: IStore } = this.props;

    store.addChangeListener(this.handleStateUpdate);
  }

  public componentWillUnmount() {
    const { store }: { store: IStore } = this.props;

    store.removeChangeListener(this.handleStateUpdate);
  }

  protected getState(): IState {
    const { store }: { store: IStore } = this.props;

    return store.getState();
  }
}
