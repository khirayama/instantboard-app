import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class LayeredList extends React.Component<any, any> {
  private static childContextTypes = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func
  };

  private setCurrentIndex: any;

  constructor(props: any) {
    super(props);

    this.state = {
      currentIndex: props.index || 0
    };

    this.setCurrentIndex = this._setCurrentIndex.bind(this);
  }

  public getChildContext() {
    const { currentIndex } = this.state;

    return {
      currentIndex,
      setCurrentIndex: this.setCurrentIndex
    };
  }

  public render() {
    const { children } = this.props;
    const props: any = {...this.props,
      index: undefined};
    const className = 'layered-list';
    props.className = props.className ? props.className + ' ' + className : className;

    return <div {...props}>{children}</div>;
  }

  private _setCurrentIndex(index: number) {
    const { onChange } = this.props;

    this.setState({ currentIndex: index });
    if (onChange) {
      onChange(index);
    }
  }
}
