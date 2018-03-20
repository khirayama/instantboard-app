import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class LayeredChildListItem extends React.Component<any, any> {
  private static contextTypes = {
    currentIndex: PropTypes.number,
  };

  public render() {
    const { currentIndex } = this.context;
    const { children, index } = this.props;
    const props: any = {
      ...this.props,
      index: undefined,
    };
    const className = 'layered-child-list-item';
    props.className = props.className ? props.className + ' ' + className : className;

    if (Number(index) === currentIndex) {
      return <li {...props}>{children}</li>;
    }
    return null;
  }
}