import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IRecycleTableContentListItemProps {
  index: number;
  children: any;
}

export class RecycleTableContentListItem extends React.Component<IRecycleTableContentListItemProps, any> {
  private static contextTypes: any = {
    handleTouchStart: PropTypes.func,
    handleTouchMove: PropTypes.func,
    handleTouchEnd: PropTypes.func,
    currentIndex: PropTypes.number,
  };

  public render(): any {
    const { currentIndex, handleTouchStart, handleTouchMove, handleTouchEnd } = this.context;
    const { index, children } = this.props;
    let isHidden: boolean = false;
    if (index < currentIndex - 1 || currentIndex + 1 < index) {
      isHidden = true;
    }

    return (
      <section
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={classNames('recycle-table-content-list-item', {
          'recycle-table-content-list-item__hidden': isHidden,
        })}
      >
        <section className="recycle-table-content-list-item--inner">{children}</section>
      </section>
    );
  }
}
