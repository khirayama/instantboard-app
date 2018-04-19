import * as classNames from 'classnames';
import Icon from 'presentations/components/Icon';
import * as React from 'react';
import { Link } from 'router/Link';

export default class ApplicationHeader extends React.Component<any, any> {
  public render() {
    const { index, badges } = this.props;
    const currentIndex = index || 0;

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
