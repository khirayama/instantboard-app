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
    setCurrentIndex: PropTypes.func
  };

  private handleClick: any;

  constructor(props: any) {
    super(props);

    this.handleClick = this._handleClick.bind(this);
  }

  public render() {
    const { currentIndex } = this.context;
    const { index, children } = this.props;

    return (
      <button
        type='submit'
        className={classNames('recycle-table-list-item', { 'recycle-table-list-item__active': index === currentIndex })}
        onClick={this.handleClick}
      >
        {children}
      </button>
    );
  }

  private _handleClick() {
    const { setCurrentIndex } = this.context;
    const { onActive, index } = this.props;
    setCurrentIndex(Number(index));
    if (onActive) {
      onActive(index);
    }
  }
}
