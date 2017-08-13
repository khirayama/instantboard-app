import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

export class RecycleTableListItem extends React.Component<any, any> {
  private static contextTypes = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  private static propTypes = {
    index: PropTypes.number.isRequired,
    children: PropTypes.node,
    onActive: PropTypes.func,
  };

  _handleClick() {
    this.context.setCurrentIndex(Number(this.props.index));
    if (this.props.onActive) {
      this.props.onActive(this.props.index);
    }
  }
  render() {
    const index: number = Number(this.props.index);

    return (
      <button
        className={classNames(
          'recycle-table-list-item',
          {'recycle-table-list-item__active': (index === this.context.currentIndex)},
        )}
        onClick={() => this._handleClick()}
        >{this.props.children}</button>
    );
  }
}
