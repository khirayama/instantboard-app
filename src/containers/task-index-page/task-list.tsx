import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  Icon,
} from '../../components/icon';
import {
  List,
  ListItem,
} from '../../components/list';
import Skeleton from '../../components/skeleton';
import TaskListItem from './task-list-item';

export default class TaskList extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleSortTaskList: any;

  private handleClickAddTaskButton: any;

  constructor(props: any) {
    super(props);

    this.handleSortTaskList = this._handleSortTaskList.bind(this);
    this.handleClickAddTaskButton = this._handleClickAddTaskButton.bind(this);
  }

  public render() {
    const ui = this.props.ui;
    const tasks = this.props.tasks;

    if (ui.isLoadingTasks && tasks.length === 0) {
      return (
        <List className="task-list">
          {[0, 1, 2, 3, 4, 5].map((index: number) => {
            return (
              <ListItem key={index} className="task-list--item">
                <div className="task-list--item--complete-button">
                  <Icon type="check"/>
                </div>
                { (index === 0 || index === 3) ? (
                  <span className="task-list--item--schedule--container">
                    <span className="task-list--item--schedule"><Skeleton/></span>
                  </span>
                ) : null }
                <div className="task-list--item--content">
                  <div className="task-list--item--content--loader"><Skeleton/></div>
                </div>
                <div className="task-list--item--delete-button">
                  <Icon type="remove"/>
                </div>
              </ListItem>
            );
          })}
        </List>
      );
    } else if (tasks.length === 0) {
      return this.createNoTasksContent();
    }
    return (
      <List
        className="task-list"
        onSort={this.handleSortTaskList}
      >
        {tasks.map((task: any) => {
          return (
            <TaskListItem
              key={task.id}
              actions={this.props.actions}
              task={task}
            />
          );
        })}
      </List>
    );
  }

  private createNoTasksContent() {
    return (
      <div className="task-index-page--content--no-tasks">
        <div className="task-index-page--content--no-tasks--inner">
          <p>{'You\'re all done.'}</p>
          <div className="floating-button" onClick={this.handleClickAddTaskButton}>ADD TASK</div>
        </div>
      </div>
    );
  }

  private _handleSortTaskList(from: number, to: number) {
    const tasks = this.props.tasks;
    const task = tasks[from];

    if (task.priority !== to) {
      this.props.actions.sortTask(task, to);
    }
  }

  private _handleClickAddTaskButton() {
    const label = this.props.label;

    this.context.move(`/tasks/new?label-id=${label.id}`);
  }
}
