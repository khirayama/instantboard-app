import * as React from 'react';

import { FlatButton } from 'presentations/components/FlatButton';
import { Icon } from 'presentations/components/Icon';
import { ListItem } from 'presentations/components/ListItem';

export class RequestListItem extends React.Component<any, any> {
  public render(): any {
    const { request, onClickAcceptButton, onClickRefuseButton } = this.props;

    const handleClickAcceptButton: any = (event: any): void => {
      if (onClickAcceptButton) {
        onClickAcceptButton(event, this.props, this.state);
      }
    };

    const handleClickRefuseButton: any = (event: any): void => {
      if (onClickRefuseButton) {
        onClickRefuseButton(event, this.props, this.state);
      }
    };

    const props: any = { ...this.props };
    delete props.request;
    delete props.onClickAcceptButton;
    delete props.onClickRefuseButton;

    return (
      <ListItem {...props}>
        <div className="request-list-item">
          <div className="request-list-item--information-container">
            <div className="request-list-item--label-name">{request.label.name}</div>
            <div className="request-list-item--description">
              {'From '}
              {request.member.name}
            </div>
          </div>
          <div className="request-list-item--button-container">
            <FlatButton className="request-list-item--accept-button" onClick={handleClickAcceptButton}>
              {'ACCEPT'}
            </FlatButton>
            <FlatButton className="request-list-item--refuse-button" onClick={handleClickRefuseButton}>
              <Icon type="remove" />
            </FlatButton>
          </div>
        </div>
      </ListItem>
    );
  }
}
