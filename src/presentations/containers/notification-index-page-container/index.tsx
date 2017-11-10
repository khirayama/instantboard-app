import * as React from 'react';
import {
  fetchRequest,
  updateRequest,
} from '../../../action-creators/request';
import {
  pollRequest,
} from '../../../action-creators/request';
import NotificationIndexPage from '../../pages/notification-index-page';
import poller from '../../../utils/poller';
import Container from '../container';

export default class NotificationIndexPageContainer extends Container<any, any> {
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
  }

  public render() {
    return (
      <NotificationIndexPage
        actions={this.actions}
        ui={this.state.ui}
        requests={this.state.requests}
      />
    );
  }
}
