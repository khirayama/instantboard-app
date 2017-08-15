import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import IconButton from '../../fundamental/icon-button';

export default class TabNavigationContent extends React.Component<any, any> {
  public render() {
    return <div className="tab-navigation-content">{this.props.children}</div>;
  }
}
