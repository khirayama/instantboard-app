import * as React from 'react';

export class LayeredParentList extends React.Component<any, any> {
  public render(): JSX.Element {
    const { children } = this.props;
    const props: any = { ...this.props };
    const className: string = 'layered-parent-list';
    props.className = props.className ? `${props.className} ${className}` : className;

    return <ul {...props}>{children}</ul>;
  }
}
