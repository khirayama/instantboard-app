import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  TabNavigation,
  TabNavigationContent,
} from '../../components/custom/tab-navigation';
import Container from '../container';
import {LabelsTabContent} from './labels-tab-content';

export default class LabelIndexPage extends Container<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  public render() {
    const actions = {
      // UpdateLabel: this.updateLabel.bind(this),
      // deleteLabel: this.deleteLabel.bind(this),
      // sortLabel: this.sortLabel.bind(this),
      // updateTask: this.updateTask.bind(this),
      // deleteTask: this.deleteTask.bind(this),
      // sortTask: this.sortTask.bind(this),
      // acceptRequest: this.acceptRequest.bind(this),
      // refuseRequest: this.refuseRequest.bind(this),
      // updateUser: this.updateUser.bind(this),
      // deleteUser: () => {
      //   clearTabIndex();
      //   const dispatch = this.props.store.dispatch.bind(this.props.store);
      //   deleteUser(dispatch, {accessToken: this.accessToken}).then(() => {
      //     console.log('ok');
      //     this.clearAccessToken();
      //     this.context.move('/login');
      //   });
      // },
      // logout: () => {
      //   clearTabIndex();
      //   this.clearAccessToken();
      //   this.context.move('/login');
      // },
      updateLabel: () => {},
      deleteLabel: () => {},
      sortLabel: () => {},
      updateTask: () => {},
      deleteTask: () => {},
      sortTask: () => {},
      acceptRequest: () => {},
      refuseRequest: () => {},
      updateUser: () => {},
      deleteUser: () => {},
      logout: () => {},
    };
    const ui = this.state.ui;
    const user = this.state.profile || {};
    const labels = this.state.labels;
    const tasks = this.state.tasks;
    const requests = this.state.requests;
    const members = this.state.members;

    return (
      <section className="page main-page">
        <div className="tab-navigation">
          <div className="tab-navigation-content-list tab-navigation-content-list__active">
            <div className="tab-navigation-content-list-item">
              <LabelsTabContent
                actions={actions}
                ui={ui}
                labels={labels}
              />
            </div>
          </div>
          <TabNavigation index={1}/>
        </div>
      </section>
    );
  }
}
