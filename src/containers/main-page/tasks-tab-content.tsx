import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  RecycleTable,
  RecycleTableContentList,
  RecycleTableContentListItem,
  RecycleTableList,
  RecycleTableListItem,
} from '../../components/recycle-table';

import {
  List,
  ListItem,
} from '../../components/list';

import Icon from '../../components/icon';
import FloatingButton from '../../components/floating-button';
import {LinkText} from '../../components/link-text';

export class TasksTabContent extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private createTasksTabContentLoading() {
    return (
      <div className="tasks-tab-content--loading">
        <div className="spinner">
          <svg viewBox="0 0 32 32" width="32" height="32">
            <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
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
          <FloatingButton onClick={() => this.context.move('/labels/new')}>CREATE LABEL</FloatingButton>
        </div>
      </div>
    );
  }

  private createTaskList(tasks: ITask[]) {
    const actions = this.props.actions;
    const ui = this.props.ui;

    if (ui.isLoadingTasks) {
      return (
        <List className="task-list">
          {[0, 1, 2, 3, 4, 5].map((index: number) => {
            return (
              <ListItem key={index} className="task-list--item">
                <div className="task-list--item--complete-button">
                  <div className="circle"></div>
                </div>
                { (index === 0 || index === 3) ? (
                  <span className="task-list--item--schedule--container">
                    <span className="task-list--item--schedule"><div className="skeleton" /></span>
                  </span>
                ) : null }
                <div className="task-list--item--content">
                  <div className="task-list--item--content--loader skeleton"></div>
                </div>
                <div className="task-list--item--delete-button">
                  <div className="bar"></div>
                </div>
              </ListItem>
            );
          })}
        </List>
      );
    } else if (tasks.length === 0) {
      return this.createNoTasksContent();
    } else {
      return (
        <List
          className="task-list"
          onSort={(from: number, to: number) => {
            const task = tasks[from];
            actions.sortTask(task.id, to);
          }}
        >
          {tasks.map((task: any) => {
            return (
              <ListItem key={task.id} className={classNames("task-list--item", {"task-list--item__completed": task.completed})}>
                <div className="task-list--item--complete-button">
                  <div className="circle"></div>
                </div>
                {(task.schedule) ? (
                  <span className="task-list--item--schedule--container">
                    <span className={`task-list--item--schedule task-list--item--schedule__${task.schedule.shortMonthName.toLowerCase()}`}>
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
                <div className="task-list--item--content" onClick={() => this.context.move(`/tasks/${task.id}/edit`)}>
                  <div className="task-list--item--content--text">{task.text}</div>
                </div>
                <div className="task-list--item--delete-button">
                  <div className="bar"></div>
                </div>
              </ListItem>
            );
          })}
        </List>
      );
    }
  }

  private createNoTasksContent() {
    return (
      <div className="tasks-tab-content--no-tasks">
        <div className="tasks-tab-content--no-tasks--inner">
          <p>You're all done.</p>
          <div className="floating-button" onClick={() => this.context.move('/tasks/new')}>ADD TASK</div>
        </div>
      </div>
    );
  }

  public render() {
    const actions = this.props.actions;
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
      let recycleTableContents = labels.map((label: any, index: number) => {
        const groupedTasks = tasks.filter((task: any) => {
          return (task.labelId === label.id);
        });
        return (
          <RecycleTableContentListItem key={index}>
            {this.createTaskList(groupedTasks)}
          </RecycleTableContentListItem>
        );
      });

      contentElement = (
        <RecycleTable>
          <RecycleTableList>{labels.map((label: any, index: number) => <RecycleTableListItem key={label.id} index={index}>{label.name}</RecycleTableListItem>)}</RecycleTableList>
          <RecycleTableContentList>{recycleTableContents}</RecycleTableContentList>
        </RecycleTable>
      );
    }
    return <section className="tasks-tab-content">{contentElement}</section>;
  }
}
