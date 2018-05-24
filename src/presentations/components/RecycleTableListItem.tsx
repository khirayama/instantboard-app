import * as classNames from 'classnames';
import * as React from 'react';

import { context } from 'presentations/components/RecycleTable';

interface IRecycleTableListItem {
  index: number;
  children: any;
  onActive?: any;
}

export class RecycleTableListItem extends React.Component<IRecycleTableListItem, any> {
  private setCurrentIndex: any;

  private onClick: any;

  constructor(props: any) {
    super(props);

    this.onClick = this.handleClick.bind(this);
  }

  public render(): any {
    const { index, children } = this.props;

    return (
      <context.Consumer>
        {(ctx: any): JSX.Element => {
          this.setCurrentIndex = ctx.setCurrentIndex;

          return (
            <button
              type="submit"
              className={classNames('recycle-table-list-item', {
                'recycle-table-list-item__active': index === ctx.currentIndex,
              })}
              onClick={this.onClick}
            >
              {children}
            </button>
          );
        }}
      </context.Consumer>
    );
  }

  private handleClick(): void {
    const { onActive, index } = this.props;
    this.setCurrentIndex(Number(index));
    if (onActive) {
      onActive(index);
    }
  }
}
