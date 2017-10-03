import * as React from 'react';

export default class NoNotificationContent extends React.Component<any, any> {
  public render() {
    return (
      <div className="no-notification-content">
        <div className="no-notification-content--inner">
          <p>No notifications</p>
        </div>
      </div>
    );
  }
}
