import * as classNames from 'classnames';
import * as React from 'react';
import Link from '../../../router/link';
import Icon from '../icon';

export default class ApplicationHeader extends React.Component<any, any> {
  public render() {
    const currentIndex = this.props.index || 0;
    const badges = this.props.badges || [];

    return (
      <div className="application-header">
        <div className="application-header--content">
          <Link
            to="/"
            className={classNames(
              'application-header-item',
              {'application-header-item__current': currentIndex === 0},
            )}
          >
            <Icon type="list" className="application-header--icon"/>
            {(badges.indexOf(0) !== -1) ? (<span className="application-header--icon--badge"/>) : null}
          </Link>
          <Link
            to="/labels"
            className={classNames(
              'application-header-item',
              {'application-header-item__current': currentIndex === 1},
            )}
          >
            <Icon type="label" className="application-header--icon"/>
            {(badges.indexOf(1) !== -1) ? (<span className="application-header--icon--badge"/>) : null}
          </Link>
          <Link
            to="/notifications"
            className={classNames(
              'application-header-item',
              {'application-header-item__current': currentIndex === 2},
            )}
          >
            <Icon type="notification" className="application-header--icon"/>
            {(badges.indexOf(2) !== -1) ? (<span className="application-header--icon--badge"/>) : null}
          </Link>
          <Link
            to="/profile"
            className={classNames(
              'application-header-item',
              {'application-header-item__current': currentIndex === 3},
            )}
          >
            <Icon type="profile" className="application-header--icon"/>
            {(badges.indexOf(3) !== -1) ? (<span className="application-header--icon--badge"/>) : null}
          </Link>
        </div>
      </div>
    );
  }
}
