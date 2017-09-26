import * as React from 'react';

export default class FloatingButton extends React.Component<any, any> {
  public render() {
    const props: any = Object.assign({}, this.props);
    const className = 'floating-button';
    props.className = (props.className) ? props.className + ' ' + className : className;
    return (
      <div {...props}>{this.props.children}</div>
    );
  }
}
