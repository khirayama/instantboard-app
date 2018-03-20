import * as React from 'react';

export default class FlatButton extends React.Component<any, any> {
  public render() {
    const { children } = this.props;
    const props: any = { ...this.props };
    const className = 'flat-button';
    props.className = props.className ? props.className + ' ' + className : className;

    if (props.href) {
      return <a {...props}>{children}</a>;
    }
    return (
      <button type="submit" {...props}>
        {children}
      </button>
    );
  }
}
