import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class LayeredChildListItem extends React.Component<any, any> {
  private static contextTypes = {
    currentIndex: PropTypes.number,
  };

  public render() {
    const props: any = Object.assign({}, this.props, {
      index: undefined,
    });
    const className = 'layered-child-list-item';
    props.className = (props.className) ? props.className + ' ' + className : className;

    if (this.props.index === this.context.currentIndex) {
      return (
        <li {...props}>{this.props.children}</li>
      );
    }
    return null;
  }
}
