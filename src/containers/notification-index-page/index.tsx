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
import {RequestsTabContent} from './requests-tab-content';

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
      <section className="page main-page">
        <div className="tab-navigation">
          <div className="tab-navigation-content-list tab-navigation-content-list__active">
            <div className="tab-navigation-content-list-item">
              <RequestsTabContent
                actions={this.actions}
                ui={ui}
                requests={requests}
              />
            </div>
          </div>
          <TabNavigation index={2} addTabLinkPath="/tasks/new"/>
        </div>
      </section>
    );
  }
}
