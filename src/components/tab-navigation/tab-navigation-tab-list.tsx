import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class TabNavigationTabList extends React.Component<any, any> {
  public render() {
    return <div className="tab-navigation-tab-list">{this.props.children}</div>;
  }
}
