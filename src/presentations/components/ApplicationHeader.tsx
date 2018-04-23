import * as classNames from 'classnames';
import * as React from 'react';

import { Icon } from 'presentations/components/Icon';
import { Link } from 'router/Link';

export class ApplicationHeader extends React.Component<any, any> {
  public render(): JSX.Element {
    const { index, badges } = this.props;
    const currentIndex: number = index || 0;

    return (
      <div className="application-header">
        <div className="application-header--content">
          <Link
            to="/"
            className={classNames('application-header-item', {
              'application-header-item__current': currentIndex === 0,
            })}
          >
            <Icon type="list" className="application-header--icon" />
            {badges.indexOf(0) === -1 ? null : <span className="application-header--icon--badge" />}
          </Link>
          <Link
            to="/labels"
            className={classNames('application-header-item', {
              'application-header-item__current': currentIndex === 1,
            })}
          >
            <Icon type="label" className="application-header--icon" />
            {badges.indexOf(1) === -1 ? null : <span className="application-header--icon--badge" />}
          </Link>
          <Link
            to="/notifications"
            className={classNames('application-header-item', {
              'application-header-item__current': currentIndex === 2,
            })}
          >
            <Icon type="notification" className="application-header--icon" />
            {badges.indexOf(2) === -1 ? null : <span className="application-header--icon--badge" />}
          </Link>
          <Link
            to="/profile"
            className={classNames('application-header-item', {
              'application-header-item__current': currentIndex === 3,
            })}
          >
            <Icon type="profile" className="application-header--icon" />
            {badges.indexOf(3) === -1 ? null : <span className="application-header--icon--badge" />}
          </Link>
        </div>
      </div>
    );
  }
}
