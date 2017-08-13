import * as React from 'react';

export default class IconButton extends React.Component<any, any> {
  public render() {
    const props: any = Object.assign({}, this.props);
    const className = 'icon-button';
    props.className = (props.className) ? props.className + ' ' + className : className;
    return <i {...props}>{this.props.children}</i>;
  }
}
