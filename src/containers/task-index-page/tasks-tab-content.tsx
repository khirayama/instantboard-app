import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  RecycleTable,
  RecycleTableContentList,
  RecycleTableContentListItem,
  RecycleTableList,
  RecycleTableListItem,
} from '../../components/fundamental/recycle-table';

import {
  List,
  ListItem,
} from '../../components/fundamental/list';

import FloatingButton from '../../components/fundamental/floating-button';
import LinkText from '../../components/fundamental/link-text';

export class TasksTabContent extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickCreateLabelButton: any;

  private handleSortTaskList: any;

  private handleClickAddTaskButton: any;

  constructor(props: any) {
    super(props);

    this.handleClickCreateLabelButton = this._handleClickCreateLabelButton.bind(this);
    this.handleSortTaskList = this._handleSortTaskList.bind(this);
    this.handleClickAddTaskButton = this._handleClickAddTaskButton.bind(this);
  }

  public render() {
    const ui = this.props.ui;
    const labels = this.props.labels.filter((label: any) => label.visibled);
    const tasks = this.props.tasks;

    // Loading label - Show loading
    //   No labels - Show no labels content
    //   Labels - Show recycle table view
    //     Loading tasks - Show skeleton
    //       No tasks - Show no tasks content
    //       tasks - Show task list
    let contentElement: any = null;
    if (ui.isLoadingLabels) {
      contentElement = this.createTasksTabContentLoading();
    } else if (!ui.isLoadingLabels && labels.length === 0) {
      contentElement = this.createTasksTabContentNoLabels();
    } else if (!ui.isLoadingLabels && labels.length !== 0) {
      const recycleTableContents = labels.map((label: any, index: number) => {
        const groupedTasks = tasks.filter((task: any) => {
          return (task.labelCid === label.cid);
        });
        return (
          <RecycleTableContentListItem key={label.cid} index={index}>
            {this.createTaskList(groupedTasks)}
          </RecycleTableContentListItem>
        );
      });

      contentElement = (
        <RecycleTable>
          <RecycleTableList>
            {labels.map((label: any, index: number) => {
              return <RecycleTableListItem key={label.cid} index={index}>{label.name}</RecycleTableListItem>;
            })}
          </RecycleTableList>
          <RecycleTableContentList>{recycleTableContents}</RecycleTableContentList>
        </RecycleTable>
      );
    }
    return <section className="tasks-tab-content">{contentElement}</section>;
  }

  private createTasksTabContentLoading() {
    return (
      <div className="tasks-tab-content--loading">
        <div className="spinner">
          <svg viewBox="0 0 32 32" width="32" height="32">
            <circle id="spinner" cx="16" cy="16" r="14" fill="none"/>
          </svg>
        </div>
      </div>
    );
  }

  private createTasksTabContentNoLabels() {
    return (
      <div className="tasks-tab-content--no-labels">
        <div className="tasks-tab-content--no-labels--inner">
          <p>You have no labels.<br/>Create category of task as label.</p>
          <FloatingButton onClick={this.handleClickCreateLabelButton}>CREATE LABEL</FloatingButton>
        </div>
      </div>
    );
  }

  private createTaskList(tasks: ITask[]) {
    const ui = this.props.ui;

    if (ui.isLoadingTasks) {
      return (
        <List className="task-list">
          {[0, 1, 2, 3, 4, 5].map((index: number) => {
            return (
              <ListItem key={index} className="task-list--item">
                <div className="task-list--item--complete-button">
                  <div className="circle"/>
                </div>
                { (index === 0 || index === 3) ? (
                  <span className="task-list--item--schedule--container">
                    <span className="task-list--item--schedule"><div className="skeleton"/></span>
                  </span>
                ) : null }
                <div className="task-list--item--content">
                  <div className="task-list--item--content--loader skeleton"/>
                </div>
                <div className="task-list--item--delete-button">
                  <div className="bar"/>
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
          const handleClickTaskListItem = this._handleClickTaskListItem.bind(this, task.cid);

          return (
            <ListItem
              key={task.cid}
              className={classNames('task-list--item', {'task-list--item__completed': task.completed})}
            >
              <div className="task-list--item--complete-button">
                <div className="circle"/>
              </div>
              {(task.schedule) ? (
                <span className="task-list--item--schedule--container">
                  <span
                    className={classNames(
                      'task-list--item--schedule',
                      `task-list--item--schedule__${task.schedule.shortMonthName.toLowerCase()}`,
                    )}
                  >
                    <span className="task-list--item--schedule--month">
                      {task.schedule.shortMonthName}
                    </span>
                    <span className="task-list--item--schedule--date">
                      {task.schedule.date}
                    </span>
                    <span className="task-list--item--schedule--day">
                      {task.schedule.shortDayName}
                    </span>
                  </span>
                </span>
              ) : null}
              <div className="task-list--item--content" onClick={handleClickTaskListItem}>
                <div className="task-list--item--content--text"><LinkText>{task.text}</LinkText></div>
              </div>
              <div className="task-list--item--delete-button">
                <div className="bar"/>
              </div>
            </ListItem>
          );
        })}
      </List>
    );
  }

  private createNoTasksContent() {
    return (
      <div className="tasks-tab-content--no-tasks">
        <div className="tasks-tab-content--no-tasks--inner">
          <p>{'You\'re all done.'}</p>
          <div className="floating-button" onClick={this.handleClickAddTaskButton}>ADD TASK</div>
        </div>
      </div>
    );
  }

  private _handleClickCreateLabelButton() {
    this.context.move('/labels/new');
  }

  private _handleSortTaskList(from: number, to: number) {
    const actions = this.props.actions;
    const tasks = this.props.tasks;
    const task = tasks[from];
    actions.sortTask(task.cid, to);
  }

  private _handleClickTaskListItem(id: string) {
    this.context.move(`/tasks/${id}/edit`);
  }

  private _handleClickAddTaskButton() {
    this.context.move('/tasks/new');
  }
}
