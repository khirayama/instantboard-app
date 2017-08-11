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
    return (
      <a
        href={this.props.to}
        className={this.props.className}
        onClick={this.handleClick}
      >{this.props.children}</a>
    );
  }

  private _handleClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const path = this.props.to;
    this.context.move(path);
  }
}
