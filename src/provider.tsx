import * as React from 'react';
import {findActivity} from './activities';

interface IProviderProps {
  store: IStore;
}

export default class Provider extends React.Component<IProviderProps, IState> {
  constructor(props: IProviderProps) {
    super(props);

    this.state = props.store.getState();
  }
  public componentWillMount() {
    const store = this.props.store;

    store.addChangeListener(() => {
      this.setState(store.getState());
    });
  }
  public render() {
    const ui = this.state.ui;
    const activity: IActivity|null = findActivity(ui.activityKey);

    if (activity) {
      return React.createElement(activity.component, {store: this.props.store});
    }
    return null;
  }
}
