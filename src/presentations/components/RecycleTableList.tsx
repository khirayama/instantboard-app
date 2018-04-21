import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IRecycleTableList {
  children: any;
}

export class RecycleTableList extends React.Component<IRecycleTableList, any> {
  private static contextTypes: any = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  private recycleTableList: any;

  private refRecycleTableList: any;

  constructor(props: any) {
    super(props);

    this.refRecycleTableList = this.setRecycleTableList.bind(this);
  }

  public componentDidMount(): void {
    this.adjustListPosition();
  }

  public componentDidUpdate(): void {
    this.adjustIndex();
    this.adjustListPosition();
  }

  public adjustIndex(): void {
    const { currentIndex, setCurrentIndex } = this.context;
    const el: HTMLElement = this.recycleTableList;
    const listItems: NodeListOf<HTMLElement> = el.querySelectorAll('.recycle-table-list-item');
    if (listItems.length - 1 < currentIndex) {
      setCurrentIndex(listItems.length - 1);
    }
  }

  public adjustListPosition(): void {
    const el: HTMLElement = this.recycleTableList;
    const container: HTMLElement = el.parentNode as HTMLElement;
    const inner: HTMLElement = el.querySelector('.recycle-table-list--inner') as HTMLElement;
    const listItems: NodeListOf<HTMLElement> = el.querySelectorAll('.recycle-table-list-item');
    const firstItem: HTMLElement = listItems[0];
    const lastItem: HTMLElement = listItems[listItems.length - 1];
    if (container && firstItem && lastItem) {
      const paddingLeft: number = (container.clientWidth - firstItem.clientWidth) / 2;
      const paddingRight: number = (container.clientWidth - lastItem.clientWidth) / 2;
      let width: number = 0;
      for (const listItem of listItems) {
        width += listItem.clientWidth;
      }

      if (width && paddingLeft && paddingRight) {
        el.style.visibility = 'visible';
        inner.style.width = `${width + paddingLeft + paddingRight + 3}px`;
        inner.style.paddingLeft = `${paddingLeft}px`;
        inner.style.paddingRight = `${paddingRight}px`;
      }
    }
  }

  public render(): any {
    const { children } = this.props;

    return (
      <section ref={this.refRecycleTableList} className="recycle-table-list" style={{ visibility: 'hidden' }}>
        <section className="recycle-table-list--inner">{children}</section>
      </section>
    );
  }

  private setRecycleTableList(recycleTableList: HTMLElement | null): void {
    this.recycleTableList = recycleTableList;
  }
}
