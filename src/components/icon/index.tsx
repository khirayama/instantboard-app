import * as React from 'react';

export class Icon extends React.Component<any, any> {
  public render() {
    const props: any = Object.assign({}, this.props);
    props.className = (props.className) ? props.className + ' icon' : 'icon';
    return <i {...props}>{this.props.children}</i>;
  }
}
