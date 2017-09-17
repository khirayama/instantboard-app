import * as PropTypes from 'prop-types';
import * as React from 'react';
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

  public render() {
    const actions = {
      acceptRequest: () => {
        let count = 0;
        count++;
      },
      refuseRequest: () => {
        let count = 0;
        count++;
      },
    };
    const ui = this.state.ui;
    const requests = this.state.requests;

    return (
      <section className="page main-page">
        <div className="tab-navigation">
          <div className="tab-navigation-content-list tab-navigation-content-list__active">
            <div className="tab-navigation-content-list-item">
              <RequestsTabContent
                actions={actions}
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
