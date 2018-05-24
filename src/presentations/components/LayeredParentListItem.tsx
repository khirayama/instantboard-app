import * as classNames from 'classnames';
import * as React from 'react';

import { context } from 'presentations/components/LayeredList';

export class LayeredParentListItem extends React.Component<any, any> {
  private setCurrentIndex: any;

  private onClick: any;

  constructor(props: any) {
    super(props);

    this.onClick = this.handleClick.bind(this);
  }

  public render(): JSX.Element {
    const { index, children } = this.props;

    return (
      <context.Consumer>
        {(ctx: any): JSX.Element => {
          this.setCurrentIndex = ctx.setCurrentIndex;

          return (
            <li
              role="listbox"
              className={classNames('layered-parent-list-item', {
                'layered-parent-list-item__active': Number(index) === ctx.currentIndex,
              })}
              onClick={this.onClick}
            >
              {children}
            </li>
          );
        }}
      </context.Consumer>
    );
  }

  private handleClick(): void {
    const { onActive, index } = this.props;

    this.setCurrentIndex(Number(index));
    if (onActive) {
      onActive(Number(index));
    }
  }
}
