import * as React from 'react';

export default class SpinnerIcon extends React.Component<any, any> {
  public render() {
    return (
      <div className="spinner-icon">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <circle id="spinner" cx="16" cy="16" r="14" fill="none"/>
        </svg>
      </div>
    );
  }
}
