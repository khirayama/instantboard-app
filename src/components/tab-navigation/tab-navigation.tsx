import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class TabNavigation extends React.Component<any, any> {
  private static childContextTypes = {
    getIndex: PropTypes.func,
    setIndex: PropTypes.func,
  };

  constructor(props: any) {
    super(props);
    const initialIndex = props.initialIndex || 0;

    this.state = {
      index: initialIndex,
    };
  }

  public render() {
    return <div className="tab-navigation">{this.props.children}</div>;
  }

  private getChildContext() {
    return {
      getIndex: this.getIndex.bind(this),
      setIndex: this.setIndex.bind(this),
    };
  }

  private getIndex(index: number) {
    return this.state.index;
  }

  private setIndex(index: number|null) {
    if (index !== null && this.state.index !== index) {
      this.setState({index});
      this.props.onChange(index);
    }
  }
}
