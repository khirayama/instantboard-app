import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Icon from '../icon';

export default class ApplicationHeader extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickTaskTabLink: any;

  private handleClickLabelTabLink: any;

  private handleClickNotificationTabLink: any;

  private handleClickProfileTabLink: any;

  constructor(props: any) {
    super(props);

    this.handleClickTaskTabLink = this._handleClickTaskTabLink.bind(this);
    this.handleClickLabelTabLink = this._handleClickLabelTabLink.bind(this);
    this.handleClickNotificationTabLink = this._handleClickNotificationTabLink.bind(this);
    this.handleClickProfileTabLink = this._handleClickProfileTabLink.bind(this);
  }

  public render() {
    const currentIndex = this.props.index || 0;
    const badges = this.props.badges || [];

    return (
      <div className="application-header">
        <div className="application-header--content">
          <div
            className={classNames(
              'application-header-item',
              {'application-header-item__current': currentIndex === 0},
            )}
            onClick={this.handleClickTaskTabLink}
          >
            <Icon type="list" className="application-header--icon"/>
            {(badges.indexOf(0) !== -1) ? (<span className="application-header--icon--badge"/>) : null}
          </div>
          <div
            className={classNames(
              'application-header-item',
              {'application-header-item__current': currentIndex === 1},
            )}
            onClick={this.handleClickLabelTabLink}
          >
            <Icon type="label" className="application-header--icon"/>
            {(badges.indexOf(1) !== -1) ? (<span className="application-header--icon--badge"/>) : null}
          </div>
          <div
            className={classNames(
              'application-header-item',
              {'application-header-item__current': currentIndex === 2},
            )}
            onClick={this.handleClickNotificationTabLink}
          >
            <Icon type="notification" className="application-header--icon"/>
            {(badges.indexOf(2) !== -1) ? (<span className="application-header--icon--badge"/>) : null}
          </div>
          <div
            className={classNames(
              'application-header-item',
              {'application-header-item__current': currentIndex === 3},
            )}
            onClick={this.handleClickProfileTabLink}
          >
            <Icon type="profile" className="application-header--icon"/>
            {(badges.indexOf(3) !== -1) ? (<span className="application-header--icon--badge"/>) : null}
          </div>
        </div>
      </div>
    );
  }

  private _handleClickTaskTabLink() {
    this.context.move('/');
  }

  private _handleClickLabelTabLink() {
    this.context.move('/labels');
  }

  private _handleClickNotificationTabLink() {
    this.context.move('/notifications');
  }

  private _handleClickProfileTabLink() {
    this.context.move('/profile');
  }
}
