import * as React from 'react';

export class TabNavigationContent extends React.Component<any, any> {
  public render(): any {
    const { children } = this.props;

    return <div className="tab-navigation-content">{children}</div>;
  }
}
