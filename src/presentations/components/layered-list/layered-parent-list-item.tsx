import * as classNames from 'classnames';
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
    const index: number = Number(this.props.index);

    return (
      <li
        className={classNames(
          'layered-parent-list-item',
          {'layered-parent-list-item__active': (index === this.context.currentIndex)},
        )}
        onClick={this.handleClick}>{this.props.children}
      </li>
    );
  }

  private _handleClick() {
    this.context.setCurrentIndex(Number(this.props.index));
    if (this.props.onActive) {
      this.props.onActive(this.props.index);
    }
  }
}
