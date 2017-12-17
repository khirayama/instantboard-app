import * as React from 'react';

export default class LayeredParentList extends React.Component<any, any> {
  public render() {
    const props: any = Object.assign({}, this.props);
    const className = 'layered-parent-list';
    props.className = (props.className) ? props.className + ' ' + className : className;

    return (
      <ul {...props}>{this.props.children}</ul>
    );
  }
}
