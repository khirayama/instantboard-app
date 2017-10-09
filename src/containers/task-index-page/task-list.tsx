import * as classNames from 'classnames';
import * as React from 'react';
import IconLink from '../../components/common/icon-link';
import LoadingContent from '../../components/common/loading-content';
import {List} from '../../components/list';
import Link from '../../router/link';
import NoTaskContent from './no-task-content';
import TaskListItem from './task-list-item';

export default class TaskList extends React.Component<any, any> {
  private handleSortTaskList: any;

  constructor(props: any) {
    super(props);

    this.handleSortTaskList = this._handleSortTaskList.bind(this);
  }

  public render() {
    const ui = this.props.ui;
    const tasks = this.props.tasks;
    const label = this.props.label;

    let backgroundElement: any = null;
    if (ui.isLoadingTasks && tasks.length === 0) {
      backgroundElement = <LoadingContent />;
    } else if (tasks.length === 0) {
      backgroundElement = <NoTaskContent label={label} />;
    }

    const parentElement: any = window.document.querySelectorAll('.recycle-table-content-list-item')[this.props.index];

    return (
      <span>
        <List
          parentElement={parentElement}
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
        {(tasks.length !== 0) ? (
          <IconLink
            to={`/tasks/new?label-id=${label.id}`}
            iconType="add"
            className="task-list--add-button"
          >ADD TASK</IconLink>
        ) : null }
        {backgroundElement}
      </span>
    );
  }

  private _handleSortTaskList(from: number, to: number) {
    const tasks = this.props.tasks;
    const task = tasks[from];

    if (task.priority !== to) {
      this.props.actions.sortTask(task, to);
    }
  }
}
