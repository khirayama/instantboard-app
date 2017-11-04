import * as React from 'react';

export default class TabNavigationContent extends React.Component<any, any> {
  public render() {
    return <div className="tab-navigation-content">{this.props.children}</div>;
  }
}
