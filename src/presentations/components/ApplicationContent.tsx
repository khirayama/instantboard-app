import * as React from 'react';

export class ApplicationContent extends React.Component<any, any> {
  public render(): JSX.Element {
    const { children } = this.props;

    return (
      <div className="application-content">
        <div className="application-content--inner">{children}</div>
      </div>
    );
  }
}
