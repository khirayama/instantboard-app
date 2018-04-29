import * as React from 'react';

import { FlatButton } from 'presentations/components/FlatButton';
import { Icon } from 'presentations/components/Icon';
import { ListItem } from 'presentations/components/ListItem';

export class RequestListItem extends React.Component<any, any> {
  private onClickAcceptButton: (event: React.MouseEvent<HTMLElement>) => void;

  private onClickRefuseButton: (event: React.MouseEvent<HTMLElement>) => void;

  constructor(props: any) {
    super(props);

    this.onClickAcceptButton = this.handleClickAcceptButton.bind(this);
    this.onClickRefuseButton = this.handleClickRefuseButton.bind(this);
  }

  public render(): JSX.Element {
    const { request } = this.props;

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
            <FlatButton className="request-list-item--accept-button" onClick={this.onClickAcceptButton}>
              {'ACCEPT'}
            </FlatButton>
            <FlatButton className="request-list-item--refuse-button" onClick={this.onClickRefuseButton}>
              <Icon type="remove" />
            </FlatButton>
          </div>
        </div>
      </ListItem>
    );
  }

  private handleClickAcceptButton(event: React.MouseEvent<HTMLElement>): void {
    const { onClickAcceptButton } = this.props;

    if (onClickAcceptButton) {
      onClickAcceptButton(event, this.props, this.state);
    }
  }

  private handleClickRefuseButton(event: React.MouseEvent<HTMLElement>): void {
    const { onClickRefuseButton } = this.props;
    if (onClickRefuseButton) {
      onClickRefuseButton(event, this.props, this.state);
    }
  }
}
