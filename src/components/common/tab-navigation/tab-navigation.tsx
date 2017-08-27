import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Icon from './icon';

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

    return (
      <div className="tab-navigation-tab-list">
        <div
          className={classNames(
            'tab-navigation-tab-list-item',
            {'tab-navigation-tab-list-item__current': currentIndex === 0},
          )}
          onClick={this.handleClickTaskTabLink}
        >
          <Icon type="list"/>
        </div>
        <div
          className={classNames(
            'tab-navigation-tab-list-item',
            {'tab-navigation-tab-list-item__current': currentIndex === 1},
          )}
          onClick={this.handleClickLabelTabLink}
        >
          <Icon type="label"/>
        </div>
        <div
          className="tab-navigation-tab-list-item"
          onClick={this.handleClickAddTabLink}
        >
          <Icon type="add"/>
        </div>
        <div
          className={classNames(
            'tab-navigation-tab-list-item',
            {'tab-navigation-tab-list-item__current': currentIndex === 2},
          )}
          onClick={this.handleClickNotificationTabLink}
        >
          <Icon type="notification"/>
        </div>
        <div
          className={classNames(
            'tab-navigation-tab-list-item',
            {'tab-navigation-tab-list-item__current': currentIndex === 3},
          )}
          onClick={this.handleClickProfileTabLink}
        >
          <Icon type="profile"/>
        </div>
      </div>
    );
  }

  private _handleClickTaskTabLink() {
    this.context.move('/tasks');
  }

  private _handleClickLabelTabLink() {
    this.context.move('/labels');
  }

  private _handleClickAddTabLink() {
    if (window.location.pathname === '/labels') {
      this.context.move('/labels/new');
    } else {
      this.context.move('/tasks/new');
    }
  }

  private _handleClickNotificationTabLink() {
    this.context.move('/notifications');
  }

  private _handleClickProfileTabLink() {
    this.context.move('/profile');
  }
}
