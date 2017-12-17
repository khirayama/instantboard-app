import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class LayeredList extends React.Component<any, any> {
  private static childContextTypes = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  private setCurrentIndex: any;

  constructor(props: any) {
    super(props);

    this.state = {
      currentIndex: props.index || 0,
    };

    this.setCurrentIndex = this._setCurrentIndex.bind(this);
  }

  public getChildContext() {
    return {
      currentIndex: this.state.currentIndex,
      setCurrentIndex: this.setCurrentIndex,
    };
  }

  public render() {
    const props: any = Object.assign({}, this.props, {
      index: undefined,
    });
    const className = 'layered-list';
    props.className = (props.className) ? props.className + ' ' + className : className;

    return (
      <div {...props}>{this.props.children}</div>
    );
  }

  private _setCurrentIndex(index: number) {
    this.setState({currentIndex: index});
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }
}
