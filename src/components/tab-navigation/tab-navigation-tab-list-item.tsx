import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class TabNavigationTabListItem extends React.Component<any, any> {
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
