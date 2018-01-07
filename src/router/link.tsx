import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class Link extends React.Component<ILinkProps, any> {
  private static contextTypes = {
    move: PropTypes.func.isRequired,
  };

  private handleClick;

  constructor(props: ILinkProps) {
    super(props);

    this.handleClick = this._handleClick.bind(this);
  }

  public render() {
    const { children, className, to } = this.props;
    return (
      <a href={to} className={className} onClick={this.handleClick}>
        {children}
      </a>
    );
  }

  private _handleClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const { move } = this.context;
    const { to } = this.props;
    move(to);
  }
}
