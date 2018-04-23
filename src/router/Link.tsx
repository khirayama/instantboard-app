import * as PropTypes from 'prop-types';
import * as React from 'react';

interface ILinkProps {
  to: string;
  className?: string;
}

export class Link extends React.Component<ILinkProps> {
  private static contextTypes: {
    move: any;
  } = {
    move: PropTypes.func.isRequired,
  };

  private onClick: any;

  constructor(props: ILinkProps) {
    super(props);

    this.onClick = this.handleClick.bind(this);
  }

  public render(): any {
    const { children, className, to } = this.props;

    return (
      <a href={to} className={className} onClick={this.onClick}>
        {children}
      </a>
    );
  }

  private handleClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const { move } = this.context;
    const { to } = this.props;
    move(to);
  }
}
