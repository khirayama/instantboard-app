import * as React from 'react';
import Icon from '../icon';

export default class FlatButton extends React.Component<any, any> {
  public render() {
    const props: any = Object.assign({}, this.props);
    const className = 'flat-button';
    props.className = (props.className) ? props.className + ' ' + className : className;

    if (props.href) {
      return (
        <a {...props}>{this.props.children}</a>
      );
    }
    return (
      <button {...props}>{this.props.children}</button>
    );
  }
}
