import * as React from 'react';
import ListItem from '../list/list-item';

export default class RequestListItem extends React.Component<any, any> {
  public render() {
    const request = this.props.request;

    const handleClickAcceptButton = (event: any) => {
      if (this.props.onClickCompleteButton) {
        this.props.onClickAcceptButton(event, this.props, this.state);
      }
    };

    const handleClickRefuseButton = (event: any) => {
      if (this.props.onClickTaskListItem) {
        this.props.onClickRefuseButton(event, this.props, this.state);
      }
    };

    const props = Object.assign({}, this.props);

    delete props.request;
    delete props.onClickAcceptButton;
    delete props.onClickRefuseButton;

    return (
      <ListItem
        {...props}
        className="request-list-item"
      >
        <div className="request-list-item--information-container">
          <div className="request-list-item--label-name">{request.label.name}</div>
          <div className="request-list-item--description">From {request.member.name}</div>
        </div>
        <div className="request-list-item--button-container">
          <div
            className="request-list-item--accept-button"
            onClick={handleClickAcceptButton}
          >
            Accept
          </div>
          <div
            className="request-list-item--refuse-button"
            onClick={handleClickRefuseButton}
          >
            Refuse
          </div>
        </div>
      </ListItem>
    );
  }
}
