import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class TabNavigationContentListItem extends React.Component<any, any> {
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
