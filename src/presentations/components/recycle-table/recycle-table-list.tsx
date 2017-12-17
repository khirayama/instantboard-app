import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IRecycleTableList {
  children: any;
}

export default class RecycleTableList extends React.Component<IRecycleTableList, any> {
  private static contextTypes = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  private recycleTableList: any;

  private setRecycleTableList: any;

  constructor(props: any) {
    super(props);

    this.setRecycleTableList = this._setRecycleTableList.bind(this);
  }

  public componentDidMount() {
    this._adjustListPosition();
  }

  public componentDidUpdate() {
    this._adjustIndex();
    this._adjustListPosition();
  }

  public _adjustIndex() {
    const {currentIndex, setCurrentIndex} = this.context;
    const el = this.recycleTableList;
    const listItems = el.querySelectorAll('.recycle-table-list-item');
    if (listItems.length - 1 < currentIndex) {
      setCurrentIndex(listItems.length - 1);
    }
  }

  public _adjustListPosition() {
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
      for (const listItem of listItems) {
        width += listItem.clientWidth;
      }

      if (width && paddingLeft && paddingRight) {
        el.style.visibility = 'visible';
        inner.style.width = (width + paddingLeft + paddingRight + 3) + 'px';
        inner.style.paddingLeft = paddingLeft + 'px';
        inner.style.paddingRight = paddingRight + 'px';
      }
    }
  }

  public render() {
    const {children} = this.props;
    return (
      <section
        ref={this.setRecycleTableList}
        className="recycle-table-list"
        style={{visibility: 'hidden'}}
      >
        <section className="recycle-table-list--inner">
          {children}
        </section>
      </section>
    );
  }

  private _setRecycleTableList(recycleTableList: HTMLElement|null) {
    this.recycleTableList = recycleTableList;
  }
}
