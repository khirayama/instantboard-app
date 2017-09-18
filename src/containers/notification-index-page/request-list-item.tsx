import * as React from 'react';

export default class RequestListItem extends React.Component<any, any> {
  private handleClickAcceptButton: any;

  private handleClickRefuseButton: any;

  constructor(props: any) {
    super(props);

    this.handleClickAcceptButton = this._handleClickAcceptButton.bind(this);
    this.handleClickRefuseButton = this._handleClickAcceptButton.bind(this);
  }

  public render() {
    const request = this.props.request;

    return (
      <li className="request-list--item">
        <div className="request-list--item--information-container">
          <div className="request-list--item--label-name">{request.label.name}</div>
          <div className="request-list--item--description">From {request.member.name}</div>
        </div>
        <div className="request-list--item--button-container">
          <div
            className="request-list--item--accept-button"
            onClick={this.handleClickAcceptButton}
          >
            Accept
          </div>
          <div
            className="request-list--item--refuse-button"
            onClick={this.handleClickRefuseButton}
          >
            Refuse
          </div>
        </div>
      </li>
    );
  }

  private _handleClickAcceptButton() {
    const actions = this.props.actions;
    const request = this.props.request;

    actions.updateRequest({
      id: request.id,
      status: 'accepted',
    });
  }

  private _handleClickRefuseButton() {
    const actions = this.props.actions;
    const request = this.props.request;

    actions.updateRequest({
      id: request.id,
      status: 'refused',
    });
  }
}
