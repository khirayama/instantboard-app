import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class TabNavigationContentList extends React.Component<any, any> {
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
