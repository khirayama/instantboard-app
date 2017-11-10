import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IRecycleTableListItem {
  index: number;
  children: any;
  onActive?: any;
}

export default class RecycleTableListItem extends React.Component<IRecycleTableListItem, any> {
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
      <button
        className={classNames(
          'recycle-table-list-item',
          {'recycle-table-list-item__active': (index === this.context.currentIndex)},
        )}
        onClick={this.handleClick}
      >
        {this.props.children}
      </button>
    );
  }

  private _handleClick() {
    this.context.setCurrentIndex(Number(this.props.index));
    if (this.props.onActive) {
      this.props.onActive(this.props.index);
    }
  }
}
