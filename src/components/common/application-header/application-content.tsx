import * as React from 'react';

export default class ApplicationContent extends React.Component<any, any> {
  public render() {
    return (
      <div className="application-content">{this.props.children}</div>
    );
  }
}
