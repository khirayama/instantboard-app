import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import RequestListItem from './request-list-item';

export class RequestsTabContent extends React.Component<any, any> {
  public render() {
    const requests = this.props.requests;
    const actions = this.props.actions;

    return (
      <div className="requests-tab-content">
        {(requests.length) ? (
          <ul className="request-list">
            {requests.map((request: any) => <RequestListItem key={request.id} request={request} actions={actions}/>)}
          </ul>
        ) : (
          <div className="no-request-content">
            <p>No notifications</p>
          </div>
        )}
      </div>
    );
  }
}
