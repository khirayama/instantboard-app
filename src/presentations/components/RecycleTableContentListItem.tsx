import * as classNames from 'classnames';
import * as React from 'react';

import { context as recycleTableContext } from 'presentations/components/RecycleTable';
import { context as recycleTableContentListContext } from 'presentations/components/RecycleTableContentList';

interface IRecycleTableContentListItemProps {
  index: number;
  children: any;
}

export class RecycleTableContentListItem extends React.Component<IRecycleTableContentListItemProps, any> {
  private handleTouchStart: any;

  private handleTouchMove: any;

  private handleTouchEnd: any;

  public render(): any {
    const { index, children } = this.props;

    return (
      <recycleTableContext.Consumer>
        {(ctx: any): JSX.Element => {
          let isHidden: boolean = false;
          if (index < ctx.currentIndex - 1 || ctx.currentIndex + 1 < index) {
            isHidden = true;
          }

          return (
            <section
              onTouchStart={this.handleTouchStart}
              onTouchMove={this.handleTouchMove}
              onTouchEnd={this.handleTouchEnd}
              className={classNames('recycle-table-content-list-item', {
                'recycle-table-content-list-item__hidden': isHidden,
              })}
            >
              <recycleTableContentListContext.Consumer>
                {this.bindRecycleTableContentListContext.bind(this)}
              </recycleTableContentListContext.Consumer>
              <section className="recycle-table-content-list-item--inner">{children}</section>
            </section>
          );
        }}
      </recycleTableContext.Consumer>
    );
  }

  private bindRecycleTableContentListContext(ctx: any): null {
    this.handleTouchStart = ctx.handleTouchStart;
    this.handleTouchMove = ctx.handleTouchMove;
    this.handleTouchEnd = ctx.handleTouchEnd;

    return null;
  }
}
