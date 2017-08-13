import * as PropTypes from 'prop-types';
import * as React from 'react';

export class RecycleTableList extends React.Component<any, any> {
  private static contextTypes = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  private static propTypes = {
    children: PropTypes.node,
  };

  private recycleTableList: any;

  componentDidMount() {
    this._adjustListPosition();
  }

  componentDidUpdate() {
    this._adjustIndex();
    this._adjustListPosition();
  }

  _adjustIndex() {
    const el = this.recycleTableList;
    const listItems = el.querySelectorAll('.recycle-table-list-item');
    if (listItems.length - 1 < this.context.currentIndex) {
      this.context.setCurrentIndex(listItems.length - 1);
    }
  }

  _adjustListPosition() {
    const el = this.recycleTableList;
    const container = el.parentNode;
    const inner = el.querySelector('.recycle-table-list--inner');
    const listItems = el.querySelectorAll('.recycle-table-list-item');
    const firstItem = listItems[0];
    const lastItem = listItems[listItems.length - 1];
    if (container && firstItem && lastItem) {
      const paddingLeft = (container.clientWidth - firstItem.clientWidth) / 2;
      const paddingRight = (container.clientWidth - lastItem.clientWidth) / 2;
      let width: number = 0;
      for (let i = 0; i < listItems.length; i++) {
        width += listItems[i].clientWidth;
      }

      if (width && paddingLeft && paddingRight) {
        el.style.visibility = 'visible';
        inner.style.width = (width + paddingLeft + paddingRight + 3) + 'px';
        inner.style.paddingLeft = paddingLeft + 'px';
        inner.style.paddingRight = paddingRight + 'px';
      }
    }
  }

  _setRecycleTableList(recycleTableList: HTMLElement|null) {
    this.recycleTableList = recycleTableList;
  }

  render() {
    return (
      <section
        className="recycle-table-list"
        style={{visibility: 'hidden'}}
        ref={(el) => this._setRecycleTableList(el)}
        >
        <section className="recycle-table-list--inner">
          {this.props.children}
        </section>
      </section>
    );
  }
}
