import * as React from 'react';

export class FlatButton extends React.Component<any, any> {
  public render(): JSX.Element {
    const { children } = this.props;
    const props: any = { ...this.props };
    const className: string = 'flat-button';
    props.className = props.className ? `${props.className} ${className}` : className;

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
