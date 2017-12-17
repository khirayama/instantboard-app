import * as React from 'react';

export default class TabNavigationContent extends React.Component<any, any> {
  public render() {
    const {children} = this.props;
    return (
      <div className="tab-navigation-content">
        {children}
      </div>
    );
  }
}
