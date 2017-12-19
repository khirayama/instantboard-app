import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  fetchRequest,
  updateRequest,
} from '../../../action-creators/request';
import {
  pollRequest,
} from '../../../action-creators/request';
import poller from '../../../utils/poller';
import ApplicationContent from '../../components/application-header/application-content';
import ApplicationHeader from '../../components/application-header/application-header';
import Indicator from '../../components/indicator';
import List from '../../components/list/list';
import NoNotificationContent from '../../components/no-notification-content';
import RequestListItem from '../../components/request-list-item';
import Container from '../container';

export default class NotificationIndexDesktopPage extends Container<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickAcceptButton: any;

  private handleClickRefuseButton: any;

  constructor(props: any) {
    super(props);

    this.actions = {
      pollRequest: () => {
        return pollRequest(this.dispatch, {status: 'pending'});
      },
      fetchRequest: () => {
        return fetchRequest(this.dispatch, {status: 'pending'});
      },
      updateRequest: (request: IRequestRequest) => {
        return updateRequest(this.dispatch, request);
      },
    };

    this.handleClickAcceptButton = this._handleClickAcceptButton.bind(this);
    this.handleClickRefuseButton = this._handleClickRefuseButton.bind(this);
  }

  public componentDidMount() {
    this.actions.fetchRequest();
    poller.add(this.actions.pollRequest, 5000);
  }

  public componentWillUnmount() {
    poller.remove(this.actions.pollRequest);

    super.componentWillUnmount();
  }

  public render() {
    const ui = this.state.ui;
    const requests = this.state.requests;
    const badges = (requests.length) ? [2] : [];

    return (
      <section className="page notification-index-desktop-page">
        <Indicator active={(ui.isLoadingRequests && requests.length !== 0)}/>
        <ApplicationHeader
          index={2}
          badges={badges}
        />
        <ApplicationContent>
          <List className="request-list">
            {requests.map((request: IRequest) => {
              return (
                <RequestListItem
                  key={request.id}
                  request={request}
                  onClickAcceptButton={this.handleClickAcceptButton}
                  onClickRefuseButton={this.handleClickRefuseButton}
                />
              );
            })}
          </List>
          {(requests.length === 0) ? <NoNotificationContent/> : null}
        </ApplicationContent>
      </section>
    );
  }

  private _handleClickAcceptButton(event: any, requestListItemProps: any) {
    this.actions.updateRequest({
      id: requestListItemProps.request.id,
      status: 'accepted',
    });
  }

  private _handleClickRefuseButton(event: any, requestListItemProps: any) {
    this.actions.updateRequest({
      id: requestListItemProps.request.id,
      status: 'refused',
    });
  }
}