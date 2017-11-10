import * as React from 'react';
import {
  fetchLabel,
} from '../../../action-creators/label';
import {
  createTask,
  fetchTask,
  updateTask,
} from '../../../action-creators/task';
import TaskPage from '../../pages/task-page';
import Container from '../container';

export default class TaskPageContainer extends Container<any, any> {
  constructor(props: any) {
    super(props);

    this.actions = {
      fetchLabel: () => {
        return fetchLabel(this.dispatch);
      },
      fetchTask: () => {
        return fetchTask(this.dispatch);
      },
      createTask: (task: ITaskRequest) => {
        return createTask(this.dispatch, task);
      },
      updateTask: (task: ITaskRequest) => {
        return updateTask(this.dispatch, task);
      },
    };
  }

  public render() {
    return (
      <TaskPage
        params={this.props.params}
        actions={this.actions}
        ui={this.state.ui}
        tasks={this.state.tasks}
        labels={this.state.labels}
      />
    );
  }
}
