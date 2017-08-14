import * as PropTypes from 'prop-types';
import * as React from 'react';
import IconButton from '../../components/icon-button';
import {
  TabNavigation,
  TabNavigationContentList,
  TabNavigationContentListItem,
  TabNavigationTabList,
  TabNavigationTabListItem,
} from '../../components/tab-navigation';
import Link from '../../router/link';
import Container from '../container';
import {LabelsTabContent} from './labels-tab-content';
import {RequestsTabContent} from './requests-tab-content';
import {TasksTabContent} from './tasks-tab-content';
import {UserTabContent} from './user-tab-content';

export default class MainPage extends Container {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private tabIndex: number;

  private handleChangeTabNavigation: any;

  private handleClickAddButton: any;

  constructor(props: any) {
    super(props);

    this.tabIndex = 0;

    this.handleChangeTabNavigation = this._handleChangeTabNavigation.bind(this);
    this.handleClickAddButton = this._handleClickAddButton.bind(this);
  }

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
        <TabNavigation
          initialIndex={this.loadTabIndex()}
          onChange={this.handleChangeTabNavigation}>
          <TabNavigationContentListItem>
            <TabNavigationContentList index={0}>
              <TasksTabContent
                actions={actions}
                ui={ui}
                tasks={tasks}
                labels={labels}
              />
            </TabNavigationContentList>

            <TabNavigationContentList index={1}>
              <LabelsTabContent
                actions={actions}
                ui={ui}
                labels={labels}
              />
            </TabNavigationContentList>

            <TabNavigationContentList index={2}>
              <RequestsTabContent
                actions={actions}
                ui={ui}
                requests={requests}
              />
            </TabNavigationContentList>

            <TabNavigationContentList index={3}>
              <UserTabContent
                actions={actions}
                ui={ui}
                user={user}
              />
            </TabNavigationContentList>
          </TabNavigationContentListItem>
          <TabNavigationTabList>
            <TabNavigationTabListItem index={0}><IconButton>view_list</IconButton></TabNavigationTabListItem>
            <TabNavigationTabListItem index={1}><IconButton>label</IconButton></TabNavigationTabListItem>
            <TabNavigationTabListItem>
              <div onClick={this.handleClickAddButton}><IconButton>add_box</IconButton></div>
            </TabNavigationTabListItem>
            <TabNavigationTabListItem index={2}><IconButton>notifications</IconButton></TabNavigationTabListItem>
            <TabNavigationTabListItem index={3}><IconButton>person</IconButton></TabNavigationTabListItem>
          </TabNavigationTabList>
        </TabNavigation>
      </section>
    );
  }

  private _handleChangeTabNavigation(index: number) {
    this.tabIndex = index;
    this.saveTabIndex(index);
  }

  private _handleClickAddButton() {
    if (this.tabIndex === 1) {
      this.context.move('/labels/new');
    } else {
      this.context.move('/tasks/new');
    }
  }

  private loadTabIndex(): number {
    let index = 0;
    if (typeof window === 'object' && window.sessionStorage) {
      index = Number(window.sessionStorage.getItem('_tab_navigatgion_index'));
    }
    return index;
  }

  private saveTabIndex(index: number): void {
    if (typeof window === 'object' && window.sessionStorage) {
      window.sessionStorage.setItem('_tab_navigatgion_index', String(index));
    }
  }

  private clearTabIndex() {
    if (typeof window === 'object' && window.sessionStorage) {
      window.sessionStorage.setItem('_tab_navigatgion_index', String(0));
    }
  }
}
