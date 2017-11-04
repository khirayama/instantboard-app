import * as React from 'react';
import {
  fetchLabel,
} from '../../action-creators/label';
import {
  pollRequest,
} from '../../action-creators/request';
import {
  destroyTask,
  fetchTask,
  pollTask,
  sortTask,
  updateTask,
} from '../../action-creators/task';
import TaskIndexPage from '../../components/pages/task-index-page';
import Container from '../container';

export default class TaskIndexPageContainer extends Container<IContainerProps, IState> {
  constructor(props: any) {
    super(props);

    this.actions = {
      pollTask: () => {
        return pollTask(this.dispatch);
      },
      pollRequest: () => {
        return pollRequest(this.dispatch, {status: 'pending'});
      },
      fetchLabel: () => {
        return fetchLabel(this.dispatch);
      },
      fetchTask: () => {
        return fetchTask(this.dispatch);
      },
      updateTask: (task) => {
        return updateTask(this.dispatch, task);
      },
      destroyTask: (task) => {
        return destroyTask(this.dispatch, task);
      },
      sortTask: (task: ITask, to: number) => {
        return sortTask(this.dispatch, task, to);
      },
    };
  }

  public render() {
    return (
      <TaskIndexPage
        actions={this.actions}
        ui={this.state.ui}
        labels={this.state.labels}
        tasks={this.state.tasks}
        requests={this.state.requests}
      />
    );
  }
}
