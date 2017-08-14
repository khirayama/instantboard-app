import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class TabNavigationTabListItem extends React.Component<any, any> {
  private static contextTypes = {
    getIndex: PropTypes.func,
    setIndex: PropTypes.func,
  };

  private handleClick: any;

  constructor(props: any) {
    super(props);

    this.handleClick = this._handleClick.bind(this);
  }

  public render() {
    const classNames = ['tab-navigation-tab-list-item'];
    const index = this.getIndex();
    if (index === this.context.getIndex()) {
      classNames.push('tab-navigation-tab-list-item__current');
    }
    return (
      <div
        className={classNames.join(' ')}
        onClick={this.handleClick}
      >
        {this.props.children}
      </div>
    );
  }

  private getIndex(): number|null {
    const index = (this.props.index === undefined) ? null : this.props.index;
    return index;
  }

  private _handleClick() {
    const index = this.getIndex();

    this.context.setIndex(index);
  }
}
