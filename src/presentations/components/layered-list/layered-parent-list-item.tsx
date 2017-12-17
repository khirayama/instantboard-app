import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class LayeredParentListItem extends React.Component<any, any> {
  private static contextTypes = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  private handleClick: any;

  constructor(props: any) {
    super(props);

    this.handleClick = this._handleClick.bind(this);
  }

  public render() {
    const props: any = Object.assign({}, this.props, {
      index: undefined,
    });
    const className = 'layered-parent-list-item';
    props.className = (props.className) ? props.className + ' ' + className : className;

    return (
      <li {...props} onClick={this.handleClick}>{this.props.children}</li>
    );
  }

  private _handleClick() {
    this.context.setCurrentIndex(Number(this.props.index));
    if (this.props.onActive) {
      this.props.onActive(this.props.index);
    }
  }
}
