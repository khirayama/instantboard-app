import * as React from 'react';

import { context } from 'presentations/components/LayeredList';

export class LayeredChildListItem extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <context.Consumer>
        {(ctx: any): JSX.Element | null => {
          const { children, index } = this.props;
          const props: any = {
            ...this.props,
            index: undefined,
          };
          const className: string = 'layered-child-list-item';
          props.className = props.className ? `${props.className} ${className}` : className;

          if (Number(index) === ctx.currentIndex) {
            return <li {...props}>{children}</li>;
          }

          return null;
        }}
      </context.Consumer>
    );
  }
}
