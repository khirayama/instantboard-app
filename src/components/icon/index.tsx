import * as React from 'react';

export default class Icon extends React.Component<any, any> {
  public render() {
    const props: any = Object.assign({}, this.props);
    const className = 'icon';
    props.className = (props.className) ? props.className + ' ' + className : className;
    return <i {...props}>{this.props.children}</i>;
  }
}

export class CheckIcon extends React.Component<any, any> {
  public render() {
    return (
      <div className="check-icon"/>
    );
  }
}

export class RemoveIcon extends React.Component<any, any> {
  public render() {
    return (
      <div className="remove-icon"/>
    );
  }
}

export class SpinnerIcon extends React.Component<any, any> {
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

export class VisibilityIcon extends React.Component<any, any> {
  public render() {
    return (
      <div className="visibility-icon"/>
    );
  }
}
