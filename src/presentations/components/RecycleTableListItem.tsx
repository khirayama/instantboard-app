import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IRecycleTableListItem {
  index: number;
  children: any;
  onActive?: any;
}

export class RecycleTableListItem extends React.Component<IRecycleTableListItem, any> {
  private static contextTypes: any = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  private onClick: any;

  constructor(props: any) {
    super(props);

    this.onClick = this.handleClick.bind(this);
  }

  public render(): any {
    const { currentIndex } = this.context;
    const { index, children } = this.props;

    return (
      <button
        type="submit"
        className={classNames('recycle-table-list-item', { 'recycle-table-list-item__active': index === currentIndex })}
        onClick={this.onClick}
      >
        {children}
      </button>
    );
  }

  private handleClick(): void {
    const { setCurrentIndex } = this.context;
    const { onActive, index } = this.props;
    setCurrentIndex(Number(index));
    if (onActive) {
      onActive(index);
    }
  }
}
