import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

export class RecycleTableContentListItem extends React.Component<any, any> {

  private static contextTypes = {
    handleTouchStart: PropTypes.func,
    handleTouchMove: PropTypes.func,
    handleTouchEnd: PropTypes.func,
    currentIndex: PropTypes.number,
  };

  private static propTypes = {
    children: PropTypes.node,
  };

  render() {
    let isHidden = false;
    if (
      this.props.index < this.context.currentIndex - 1 ||
      this.context.currentIndex + 1 < this.props.index
    ) {
      isHidden = true;
    }
    return (
      <section
        onTouchStart={this.context.handleTouchStart}
        onTouchMove={this.context.handleTouchMove}
        onTouchEnd={this.context.handleTouchEnd}
        className={classNames(
          'recycle-table-content-list-item',
          {'recycle-table-content-list-item__hidden': isHidden},
        )}
        >
        <section className="recycle-table-content-list-item--inner">{this.props.children}</section>
      </section>
    );
  }
}
