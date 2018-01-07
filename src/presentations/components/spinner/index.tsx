import * as React from 'react';

export default class Spinner extends React.Component<any, any> {
  public render() {
    const strokeWidth = 3;

    return (
      <div className="spinner">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <defs>
            <linearGradient id="spinner-gradient">
              <stop className="spinner-color1" offset="100%" />
              <stop className="spinner-color2" offset="100%" />
            </linearGradient>
          </defs>
          <circle id="spinner" cx="16" cy="16" r="14" fill="none" strokeWidth={strokeWidth} />
        </svg>
      </div>
    );
  }
}
