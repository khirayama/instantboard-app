import * as React from 'react';

export default class LayeredChildList extends React.Component<any, any> {
  public render() {
    const props: any = Object.assign({}, this.props);
    const className = 'layered-child-list';
    props.className = (props.className) ? props.className + ' ' + className : className;

    return (
      <ul {...props}>{this.props.children}</ul>
    );
  }
}
