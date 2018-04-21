import * as PropTypes from 'prop-types';
import * as React from 'react';

import { fetchRequest, updateRequest } from 'action-creators/request';
import { pollRequest } from 'action-creators/request';
import ApplicationContent from 'presentations/components/ApplicationContent';
import ApplicationHeader from 'presentations/components/ApplicationHeader';
import Indicator from 'presentations/components/Indicator';
import List from 'presentations/components/List';
import { NoNotificationContent } from 'presentations/components/NoNotificationContent';
import { RequestListItem } from 'presentations/components/RequestListItem';
import { Container } from 'presentations/containers/Container';
import { poller } from 'utils/poller';

export class NotificationIndexDesktopPage extends Container<{}, {}> {
  public static contextTypes: { move: any } = {
    move: PropTypes.func,
  };

  private onClickAcceptButton: (event: React.MouseEvent<HTMLDivElement>) => void;

  private onClickRefuseButton: (event: React.MouseEvent<HTMLDivElement>) => void;

  constructor(props: IContainerProps) {
    super(props);

    this.state = this.getState();

    this.actions = {
      pollRequest: (): Promise<{}> => {
        return pollRequest(this.dispatch, { status: 'pending' });
      },
      fetchRequest: (): Promise<{}> => {
        return fetchRequest(this.dispatch, { status: 'pending' });
      },
      updateRequest: (request: { id: number; labelId: number; memberId: number; status?: string }): Promise<{}> => {
        return updateRequest(this.dispatch, request);
      },
    };

    this.onClickAcceptButton = this.handleClickAcceptButton.bind(this);
    this.onClickRefuseButton = this.handleClickRefuseButton.bind(this);
  }

  public componentDidMount(): void {
    this.actions.fetchRequest();
    this.actions.pollRequest();
    poller.add(this.actions.pollRequest, 3000);
  }

  public componentWillUnmount(): void {
    poller.remove(this.actions.pollRequest);

    super.componentWillUnmount();
  }

  public render(): any {
    const ui: IUI = this.state.ui;
    const requests: IRequest[] = this.state.requests;
    const badges: number[] = requests.length ? [2] : [];

    return (
      <section className="page notification-index-desktop-page">
        <Indicator active={ui.isLoadingRequests && requests.length !== 0} />
        <ApplicationHeader index={2} badges={badges} />
        <ApplicationContent>
          <List className="request-list">
            {requests.map((request: IRequest): React.ReactNode => {
              return (
                <RequestListItem
                  key={request.id}
                  request={request}
                  onClickAcceptButton={this.onClickAcceptButton}
                  onClickRefuseButton={this.onClickRefuseButton}
                />
              );
            })}
          </List>
          {requests.length === 0 ? <NoNotificationContent /> : null}
        </ApplicationContent>
      </section>
    );
  }

  private handleClickAcceptButton(event: React.MouseEvent<HTMLDivElement>, requestListItemProps: any): void {
    this.actions.updateRequest({
      id: requestListItemProps.request.id,
      status: 'accepted',
    });
  }

  private handleClickRefuseButton(event: React.MouseEvent<HTMLDivElement>, requestListItemProps: any): void {
    this.actions.updateRequest({
      id: requestListItemProps.request.id,
      status: 'refused',
    });
  }
}
