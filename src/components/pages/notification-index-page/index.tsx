import * as PropTypes from 'prop-types';
import * as React from 'react';
import poller from '../../../utils/poller';
import Indicator from '../../indicator';
import List from '../../list/list';
import NoNotificationContent from '../../no-notification-content';
import RequestListItem from '../../request-list-item';
import TabNavigation from '../../tab-navigation/tab-navigation';
import TabNavigationContent from '../../tab-navigation/tab-navigation-content';

export default class NotificationIndexPage extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  public componentDidMount() {
    this.props.actions.fetchRequest();
    poller.add(this.props.actions.pollRequest, 5000);
  }

  public componentWillUnmount() {
    poller.remove(this.props.actions.pollRequest);
  }

  public render() {
    const ui = this.props.ui;
    const requests = this.props.requests;
    const badges = (requests.length) ? [2] : [];

    return (
      <section className="page notification-index-page">
        <Indicator active={(ui.isLoadingRequests && requests.length !== 0)}/>
        <TabNavigationContent>
          <List className="request-list">
            {requests.map((request: IRequest) => {
              return (
                <RequestListItem
                  key={request.id}
                  actions={this.props.actions}
                  request={request}
                />
              );
            })}
          </List>
          {(requests.length === 0) ? <NoNotificationContent/> : null}
        </TabNavigationContent>
        <TabNavigation
          index={2}
          badges={badges}
        />
      </section>
    );
  }
}
