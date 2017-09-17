import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  fetchLabel,
} from '../../action-creators/label';
import {
  destroyTask,
  fetchTask,
  sortTask,
  updateTask,
} from '../../action-creators/task';
import {
  TabNavigation,
  TabNavigationContent,
} from '../../components/common/tab-navigation';
import FloatingButton from '../../components/floating-button';
import {
  Icon,
  SpinnerIcon,
} from '../../components/icon';
import LinkText from '../../components/link-text';
import {
  List,
  ListItem,
} from '../../components/list';
import {
  RecycleTable,
  RecycleTableContentList,
  RecycleTableContentListItem,
  RecycleTableList,
  RecycleTableListItem,
} from '../../components/recycle-table';
import Skeleton from '../../components/skeleton';
import Container from '../container';

export default class TaskIndexPage extends Container<IContainerProps, IState> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickCreateLabelButton: any;

  private handleChangeIndex: any;

  constructor(props: any) {
    super(props);

    this.actions = {
      fetchLabel: () => {
        fetchLabel(this.dispatch);
      },
      fetchTask: () => {
        fetchTask(this.dispatch);
      },
      updateTask: (task) => {
        updateTask(this.dispatch, task);
      },
      destroyTask: (task) => {
        destroyTask(this.dispatch, task);
      },
      sortTask: (task: ITask, to: number) => {
        sortTask(this.dispatch, task, to);
      },
    };

    this.state = Object.assign({}, this.state, {index: this.loadIndex()});

    this.handleClickCreateLabelButton = this._handleClickCreateLabelButton.bind(this);
    this.handleChangeIndex = this._handleChangeIndex.bind(this);
  }

  public componentDidMount() {
    this.actions.fetchLabel();
    this.actions.fetchTask();
  }

  public render() {
    const ui = this.state.ui;
    const labels = this.state.labels.filter((label: any) => label.visibled);
    const tasks = this.state.tasks;

    let contentElement: any = null;

    // Loading label - Show loading content
    //   No labels - Show no labels content
    //   Labels - Show recycle table view
    //     Loading tasks - Show skeleton
    //       No tasks - Show no tasks content
    //       Tasks - Show task list
    if (ui.isLoadingLabels && labels.length === 0) {
      contentElement = this.createTasksTabContentLoading();
    } else if (!ui.isLoadingLabels && labels.length === 0) {
      contentElement = this.createTasksTabContentNoLabels();
    } else if (!ui.isLoadingLabels && labels.length !== 0) {
      const recycleTableContents = labels.map((label: any, index: number) => {
        const groupedTasks = tasks.filter((task: any) => {
          return (task.labelId === label.id);
        });
        return (
          <RecycleTableContentListItem key={label.id} index={index}>
            <TaskList
              actions={this.actions}
              ui={this.state.ui}
              label={label}
              tasks={groupedTasks}
            />
          </RecycleTableContentListItem>
        );
      });

      contentElement = (
        <RecycleTable index={this.state.index} onChange={this.handleChangeIndex}>
          <RecycleTableList>
            {labels.map((label: any, index: number) => {
              return <RecycleTableListItem key={label.id} index={index}>{label.name}</RecycleTableListItem>;
            })}
          </RecycleTableList>
          <RecycleTableContentList>{recycleTableContents}</RecycleTableContentList>
        </RecycleTable>
      );
    }

    const label = labels[this.state.index];
    return (
      <section className="page task-index-page">
        <TabNavigationContent>{contentElement}</TabNavigationContent>
        <TabNavigation index={0} addTabLinkPath={(label) ? `/tasks/new?label-id=${label.id}` : '/tasks/new'}/>
      </section>
    );
  }

  private loadIndex(): number {
    if (typeof window === 'object') {
      return JSON.parse(window.sessionStorage.getItem('__recycle-table-index') || '0');
    }
    return 0;
  }

  private saveIndex(index: number): void {
    if (typeof window === 'object') {
      window.sessionStorage.setItem('__recycle-table-index', JSON.stringify(index));
    }
  }

  private _handleChangeIndex(index: number): void {
    this.saveIndex(index);
    this.setState({index});
  }

  private createTasksTabContentLoading() {
    return (
      <div className="task-index-page--content--loading">
        <SpinnerIcon/>
      </div>
    );
  }

  private createTasksTabContentNoLabels() {
    return (
      <div className="task-index-page--content--no-labels">
        <div className="task-index-page--content--no-labels--inner">
          <p>You have no labels.<br/>Create category of task as label.</p>
          <FloatingButton onClick={this.handleClickCreateLabelButton}>CREATE LABEL</FloatingButton>
        </div>
      </div>
    );
  }

  private _handleClickCreateLabelButton() {
    this.context.move('/labels/new');
  }
}

class TaskList extends React.Component<any, any> {
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

class TaskListItem extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickCompleteButton: any;

  private handleClickTaskListItem: any;

  private handleClickDestroyButton: any;

  constructor(props: any) {
    super(props);

    this.handleClickCompleteButton = this._handleClickCompleteButton.bind(this);
    this.handleClickTaskListItem = this._handleClickTaskListItem.bind(this);
    this.handleClickDestroyButton = this._handleClickDestroyButton.bind(this);
  }

  public render() {
    const task = this.props.task;
    const props = Object.assign({}, this.props);

    delete props.actions;
    delete props.task;

    return (
      <ListItem
        {...props}
        className={classNames('task-list--item', {'task-list--item__completed': task.completed})}
      >
        <div className="task-list--item--complete-button" onClick={this.handleClickCompleteButton}>
          <Icon type="check" active={task.completed}/>
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
        <div className="task-list--item--content" onClick={this.handleClickTaskListItem}>
          <div className="task-list--item--content--text"><LinkText>{task.text}</LinkText></div>
        </div>
        <div className="task-list--item--destroy-button" onClick={this.handleClickDestroyButton}>
          <Icon type="remove"/>
        </div>
      </ListItem>
    );
  }

  private _handleClickCompleteButton() {
    const task = this.props.task;
    const actions = this.props.actions;

    actions.updateTask({
      id: task.id,
      completed: !task.completed,
    });
  }

  private _handleClickTaskListItem() {
    const task = this.props.task;

    this.context.move(`/tasks/${task.id}/edit?label-id=${task.labelId}`);
  }

  private _handleClickDestroyButton() {
    const task = this.props.task;
    const actions = this.props.actions;

    actions.destroyTask(task);
  }
}
