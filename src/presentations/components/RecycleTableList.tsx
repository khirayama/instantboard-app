import * as React from 'react';

import { context } from 'presentations/components/RecycleTable';

interface IRecycleTableList {
  children: any;
}

export class RecycleTableList extends React.Component<IRecycleTableList, any> {
  private currentIndex: any;

  private setCurrentIndex: any;

  private ref: any;

  public componentDidMount(): void {
    this.adjustListPosition();
  }

  public componentDidUpdate(): void {
    this.adjustIndex();
    this.adjustListPosition();
  }

  public adjustIndex(): void {
    const el: HTMLElement = this.ref.current;
    const listItems: NodeListOf<HTMLElement> = el.querySelectorAll('.recycle-table-list-item');
    if (listItems.length - 1 < this.currentIndex) {
      this.setCurrentIndex(listItems.length - 1);
    }
  }

  public adjustListPosition(): void {
    const el: HTMLElement = this.ref.current;
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

    this.ref = React.createRef();

    return (
      <section ref={this.ref} className="recycle-table-list" style={{ visibility: 'hidden' }}>
        <context.Consumer>{this.bindContext.bind(this)}</context.Consumer>
        <section className="recycle-table-list--inner">{children}</section>
      </section>
    );
  }

  private bindContext(ctx: any): null {
    this.currentIndex = ctx.currentIndex;
    this.setCurrentIndex = ctx.setCurrentIndex;

    return null;
  }
}
