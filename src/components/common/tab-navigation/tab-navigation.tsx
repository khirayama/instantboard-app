import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {Icon} from '../../icon';

export default class TabNavigation extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickTaskTabLink: any;

  private handleClickLabelTabLink: any;

  private handleClickAddTabLink: any;

  private handleClickNotificationTabLink: any;

  private handleClickProfileTabLink: any;

  constructor() {
    super();

    this.handleClickTaskTabLink = this._handleClickTaskTabLink.bind(this);
    this.handleClickLabelTabLink = this._handleClickLabelTabLink.bind(this);
    this.handleClickAddTabLink = this._handleClickAddTabLink.bind(this);
    this.handleClickNotificationTabLink = this._handleClickNotificationTabLink.bind(this);
    this.handleClickProfileTabLink = this._handleClickProfileTabLink.bind(this);
  }

  public render() {
    const currentIndex = this.props.index || 0;
    const badges = this.props.badges || [];

    return (
      <div className="tab-navigation-tab-list">
        <div
          className={classNames(
            'tab-navigation-tab-list-item',
            {'tab-navigation-tab-list-item__current': currentIndex === 0},
          )}
          onClick={this.handleClickTaskTabLink}
        >
          <Icon type="list" className="tab-navigation--icon"/>
          {(badges.indexOf(0) !== -1) ? (<span className="tab-navigation--icon--badge"/>) : null}
        </div>
        <div
          className={classNames(
            'tab-navigation-tab-list-item',
            {'tab-navigation-tab-list-item__current': currentIndex === 1},
          )}
          onClick={this.handleClickLabelTabLink}
        >
          <Icon type="label" className="tab-navigation--icon"/>
          {(badges.indexOf(1) !== -1) ? (<span className="tab-navigation--icon--badge"/>) : null}
        </div>
        <div
          className="tab-navigation-tab-list-item"
          onClick={this.handleClickAddTabLink}
        >
          <Icon type="add" className="tab-navigation--icon"/>
        </div>
        <div
          className={classNames(
            'tab-navigation-tab-list-item',
            {'tab-navigation-tab-list-item__current': currentIndex === 2},
          )}
          onClick={this.handleClickNotificationTabLink}
        >
          <Icon type="notification" className="tab-navigation--icon"/>
          {(badges.indexOf(2) !== -1) ? (<span className="tab-navigation--icon--badge"/>) : null}
        </div>
        <div
          className={classNames(
            'tab-navigation-tab-list-item',
            {'tab-navigation-tab-list-item__current': currentIndex === 3},
          )}
          onClick={this.handleClickProfileTabLink}
        >
          <Icon type="profile" className="tab-navigation--icon"/>
          {(badges.indexOf(3) !== -1) ? (<span className="tab-navigation--icon--badge"/>) : null}
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

  private _handleClickAddTabLink() {
    this.context.move(this.props.addTabLinkPath);
  }

  private _handleClickNotificationTabLink() {
    this.context.move('/notifications');
  }

  private _handleClickProfileTabLink() {
    this.context.move('/profile');
  }
}
