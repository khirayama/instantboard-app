import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

export class RequestsTabContent extends React.Component<any, any> {
  public render() {
    const requests = this.props.requests;
    const actions = this.props.actions;

    return (
      <div className="requests-tab-content">
      {(requests.length) ? (
        <ul className="request-list">
          {requests.map((request: any) => {
            return (
              <li key={request.id} className="request-list--item">
                <div className="request-list--item--information-container">
                  <div className="request-list--item--label-name">{request.labelName}</div>
                  <div className="request-list--item--description">From {request.memberName}</div>
                </div>
                <div className="request-list--item--button-container">
                  <div
                    className="request-list--item--accept-button"
                    onClick={() => {actions.acceptRequest(request.id); }}
                  >Accept</div>
                  <div
                    className="request-list--item--refuse-button"
                    onClick={() => {actions.refuseRequest(request.id); }}
                  >Refuse</div>
                </div>
              </li>
            );
          })}
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
