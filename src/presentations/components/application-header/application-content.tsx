import * as React from 'react';

export default class ApplicationContent extends React.Component<any, any> {
  public render() {
    const {children} = this.props;

    return (
      <div className="application-content">
        <div className="application-content--inner">
          {children}
        </div>
      </div>
    );
  }
}
