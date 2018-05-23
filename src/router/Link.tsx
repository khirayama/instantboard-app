import * as React from 'react';

import { context } from 'router/Navigator';

interface ILinkProps {
  to: string;
  className?: string;
}

export class Link extends React.Component<ILinkProps> {
  public move: any;

  private onClick: (event: React.MouseEvent<HTMLElement>) => void;

  constructor(props: any) {
    super(props);

    this.onClick = this.handleClick.bind(this);
  }

  public render(): JSX.Element {
    const { children, className, to } = this.props;

    return (
      <>
        <context.Consumer>{this.bindContext.bind(this)}</context.Consumer>
        <a href={to} className={className} onClick={this.onClick}>
          {children}
        </a>
      </>
    );
  }

  private bindContext(ctx: any): null {
    this.move = ctx.move;

    return null;
  }

  private handleClick(event: React.MouseEvent<HTMLElement>): void {
    const { to } = this.props;

    event.preventDefault();
    event.stopPropagation();
    this.move(to);
  }
}
