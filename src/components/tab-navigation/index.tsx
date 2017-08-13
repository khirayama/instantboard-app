import * as PropTypes from 'prop-types';
import * as React from 'react';

export class TabNavigationContentList extends React.Component<any, any> {
  private static contextTypes = {
    getIndex: PropTypes.func,
    setIndex: PropTypes.func,
  };
  public render() {
    if (this.context.getIndex() === this.props.index) {
      return (
        <div className="tab-navigation-content-list tab-navigation-content-list__active">{this.props.children}</div>
      );
    }
    return (
      <div className="tab-navigation-content-list">{this.props.children}</div>
    );
  }
}

export class TabNavigationContentListItem extends React.Component<any, any> {
  private static contextTypes = {
    getIndex: PropTypes.func,
    setIndex: PropTypes.func,
  };
  public render() {
    return (
      <div className="tab-navigation-content-list-item">{this.props.children}</div>
    );
  }
}

export class TabNavigationTabListItem extends React.Component<any, any> {
  private static contextTypes = {
    getIndex: PropTypes.func,
    setIndex: PropTypes.func,
  };
  public render() {
    const classNames = ['tab-navigation-tab-list-item'];
    const index = (this.props.index !== undefined) ? this.props.index : null;
    if (index === this.context.getIndex()) {
      classNames.push('tab-navigation-tab-list-item__current');
    }
    return (
      <div
        className={classNames.join(' ')}
        onClick={(event: any) => this.context.setIndex(index)}
      >{this.props.children}</div>
    );
  }
}

export class TabNavigationTabList extends React.Component<any, any> {
  public render() {
    return <div className="tab-navigation-tab-list">{this.props.children}</div>;
  }
}

export class TabNavigation extends React.Component<any, any> {
  private static childContextTypes = {
    getIndex: PropTypes.func,
    setIndex: PropTypes.func,
  };
  private getChildContext() {
    return {
      getIndex: this.getIndex.bind(this),
      setIndex: this.setIndex.bind(this),
    };
  }
  constructor(props: any) {
    super(props);
    const initialIndex = props.initialIndex || 0;

    this.state = {
      index: initialIndex,
    };
  }
  private getIndex(index: number) {
    return this.state.index;
  }
  private setIndex(index: number|null) {
    if (index !== null && this.state.index !== index) {
      this.setState({index});
      this.props.onChange(index);
    }
  }
  public render() {
    return <div className="tab-navigation">{this.props.children}</div>;
  }
}
