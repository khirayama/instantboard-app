import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  TabNavigation,
  TabNavigationContent,
} from '../../components/custom/tab-navigation';
import Container from '../container';
import {TasksTabContent} from './tasks-tab-content';

export default class TaskIndexPage extends Container {
  public static contextTypes = {
    move: PropTypes.func,
  };

  public render() {
    const actions = {
      updateTask: () => {},
      deleteTask: () => {},
      sortTask: () => {},
    };
    const ui = this.state.ui;
    const labels = this.state.labels;
    const tasks = this.state.tasks;

    return (
      <section className="page task-index-page">
        <TabNavigationContent>
          <TasksTabContent
            actions={actions}
            ui={ui}
            labels={labels}
            tasks={tasks}
          />
        </TabNavigationContent>
        <TabNavigation index={0}/>
      </section>
    );
  }
}
