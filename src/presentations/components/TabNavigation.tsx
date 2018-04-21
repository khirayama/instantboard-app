import * as classNames from 'classnames';
import * as React from 'react';

import Icon from 'presentations/components/Icon';
import { Link } from 'router/Link';

export class TabNavigation extends React.Component<any, any> {
  public render(): any {
    const { index, badges } = this.props;
    const currentIndex: number = index || 0;

    return (
      <div className="tab-navigation-tab-list">
        <Link
          to="/"
          className={classNames('tab-navigation-tab-list-item', {
            'tab-navigation-tab-list-item__current': currentIndex === 0,
          })}
        >
          <Icon type="list" className="tab-navigation--icon" />
          {badges.indexOf(0) === -1 ? null : <span className="tab-navigation--icon--badge" />}
        </Link>
        <Link
          to="/labels"
          className={classNames('tab-navigation-tab-list-item', {
            'tab-navigation-tab-list-item__current': currentIndex === 1,
          })}
        >
          <Icon type="label" className="tab-navigation--icon" />
          {badges.indexOf(1) === -1 ? null : <span className="tab-navigation--icon--badge" />}
        </Link>
        <Link
          to="/notifications"
          className={classNames('tab-navigation-tab-list-item', {
            'tab-navigation-tab-list-item__current': currentIndex === 2,
          })}
        >
          <Icon type="notification" className="tab-navigation--icon" />
          {badges.indexOf(2) === -1 ? null : <span className="tab-navigation--icon--badge" />}
        </Link>
        <Link
          to="/profile"
          className={classNames('tab-navigation-tab-list-item', {
            'tab-navigation-tab-list-item__current': currentIndex === 3,
          })}
        >
          <Icon type="profile" className="tab-navigation--icon" />
          {badges.indexOf(3) === -1 ? null : <span className="tab-navigation--icon--badge" />}
        </Link>
      </div>
    );
  }
}
