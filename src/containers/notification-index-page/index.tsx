import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  fetchRequest,
  updateRequest,
} from '../../action-creators/request';
import {
  TabNavigation,
  TabNavigationContent,
} from '../../components/common/tab-navigation';
import Container from '../container';
import RequestListItem from './request-list-item';

export default class NotificationIndexPage extends Container<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  constructor(props: any) {
    super(props);

    this.actions = {
      fetchRequest: () => {
        fetchRequest(this.dispatch, {status: 'pending'});
      },
      updateRequest: (request: IRequestRequest) => {
        updateRequest(this.dispatch, request);
      },
    };
  }

  public componentDidMount() {
    this.actions.fetchRequest();
  }

  public render() {
    const actions = this.actions;
    const ui = this.state.ui;
    const requests = this.state.requests;

    return (
      <section className="page notification-index-page">
        <TabNavigationContent>
          {(requests.length) ? (
            <ul className="request-list">
              {requests.map((request: IRequest) => {
                return <RequestListItem key={request.id} request={request} actions={actions}/>;
              })}
            </ul>
          ) : (
            <div className="no-request-content">
              <p>No notifications</p>
            </div>
          )}
        </TabNavigationContent>
        <TabNavigation index={2} addTabLinkPath="/tasks/new"/>
      </section>
    );
  }
}
