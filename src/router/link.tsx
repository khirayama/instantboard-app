import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class Link extends React.Component<ILinkProps, any> {
  private handleClick;

  private static contextTypes = {
    move: PropTypes.func.isRequired,
  };

  constructor(props: ILinkProps) {
    super(props);

    this.handleClick = this._handleClick.bind(this);
  }

  private _handleClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const path = this.props.to;
    this.context.move(path);
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
}
