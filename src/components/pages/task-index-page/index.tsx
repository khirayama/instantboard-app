import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import poller from '../../../utils/poller';
import IconLink from '../../icon-link';
import Indicator from '../../indicator';
import LoadingContent from '../../loading-content';
import NoLabelContent from '../../no-label-content';
import NoTaskContent from '../../no-task-content';
import RecycleTable from '../../recycle-table/recycle-table';
import RecycleTableContentList from '../../recycle-table/recycle-table-content-list';
import RecycleTableContentListItem from '../../recycle-table/recycle-table-content-list-item';
import RecycleTableList from '../../recycle-table/recycle-table-list';
import RecycleTableListItem from '../../recycle-table/recycle-table-list-item';
import TabNavigation from '../../tab-navigation/tab-navigation';
import TabNavigationContent from '../../tab-navigation/tab-navigation-content';
import TaskList from '../../task-list';
import TaskListItem from '../../task-list-item';

export default class TaskIndexPage extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleChangeIndex: any;

  private handleSortTaskList: any;

  private handleClickCompleteButton: any;

  private handleClickTaskListItem: any;

  private handleClickDestroyButton: any;

  constructor(props: any) {
    super(props);

    this.state = {
      index: this.loadIndex(),
    };

    this.handleChangeIndex = this._handleChangeIndex.bind(this);
    this.handleSortTaskList = this._handleSortTaskList.bind(this);
    this.handleClickCompleteButton = this._handleClickCompleteButton.bind(this);
    this.handleClickTaskListItem = this._handleClickTaskListItem.bind(this);
    this.handleClickDestroyButton = this._handleClickDestroyButton.bind(this);
  }

  public componentDidMount() {
    this.props.actions.fetchTask();
    this.props.actions.fetchLabel().then((action: IAction) => {
      const labels = action.payload.labels;
      for (const label of labels) {
        if (label.requests.length > 1) {
          poller.add(this.props.actions.pollTask, 5000);
          break;
        }
      }
    });
    poller.add(this.props.actions.pollRequest, 5000);
  }

  public componentWillUnmount() {
    poller.remove(this.props.actions.pollTask);
    poller.remove(this.props.actions.pollRequest);
  }

  public render() {
    const ui = this.props.ui;
    const labels = this.props.labels.filter((label: ILabel) => label.visibled);
    const tasks = this.props.tasks;
    const requests = this.props.requests;
    const currentLabel: ILabel|undefined = labels[this.state.index];

    let contentElement: any = null;

    // Loading label - Show loading content
    //   No labels - Show no labels content
    //   Labels - Show recycle table view
    //     Loading tasks - Show skeleton
    //       No tasks - Show no tasks content
    //       Tasks - Show task list
    if (ui.isLoadingLabels && labels.length === 0) {
      contentElement = <LoadingContent />;
    } else if (!ui.isLoadingLabels && labels.length === 0) {
      contentElement = <NoLabelContent />;
    } else if (labels.length !== 0) {
      const recycleTableContents = labels.map((label: ILabel, index: number) => {
        const groupedTasks = tasks.filter((task: ITask) => (task.labelId === label.id));

        let backgroundElement: any = null;
        if (ui.isLoadingTasks && groupedTasks.length === 0) {
          backgroundElement = <LoadingContent />;
        } else if (groupedTasks.length === 0) {
          backgroundElement = <NoTaskContent label={label} />;
        }
        const parentElement: any = window.document.querySelectorAll('.recycle-table-content-list-item')[index];

        return (
          <RecycleTableContentListItem key={label.id} index={index}>
            <TaskList
              className="task-list"
              parentElement={parentElement}
              tasks={groupedTasks}
              onSort={this.handleSortTaskList}
            >
              {groupedTasks.map((task: any) => {
                return (
                  <TaskListItem
                    key={task.id}
                    task={task}
                    onClickCompleteButton={this.handleClickCompleteButton}
                    onClickTaskListItem={this.handleClickTaskListItem}
                    onClickDestroyButton={this.handleClickDestroyButton}
                  />
                );
              })}
            </TaskList>
            {(groupedTasks.length !== 0) ? (
              <IconLink
                to={`/tasks/new?label-id=${label.id}`}
                iconType="add"
                className="task-list--add-button"
              >ADD TASK</IconLink>
            ) : null }
            {backgroundElement}
          </RecycleTableContentListItem>
        );
      });

      contentElement = (
        <RecycleTable
          index={this.state.index}
          onChange={this.handleChangeIndex}
        >
          <RecycleTableList>
            {labels.map((label: ILabel, index: number) => {
              return <RecycleTableListItem key={label.id} index={index}>{label.name}</RecycleTableListItem>;
            })}
          </RecycleTableList>
          <RecycleTableContentList>{recycleTableContents}</RecycleTableContentList>
        </RecycleTable>
      );
    }

    const badges = (requests.length) ? [2] : [];

    return (
      <section className="page task-index-page">
        <Indicator active={(
          (ui.isLoadingLabels && labels.length !== 0) ||
          (ui.isLoadingTasks && tasks.length !== 0)
        )}/>
        <TabNavigationContent>{contentElement}</TabNavigationContent>
        <TabNavigation
          index={0}
          badges={badges}
        />
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

  private _handleSortTaskList(from: number, to: number, taskListProps: any): void {
    const task = taskListProps.tasks[from];

    if (task.priority !== to) {
      this.props.actions.sortTask(task, to);
    }
  }

  private _handleClickCompleteButton(event: any, taskListItemProps: any): void {
    event.stopPropagation();

    this.props.actions.updateTask({
      id: taskListItemProps.task.id,
      completed: !taskListItemProps.task.completed,
    });
  }

  private _handleClickTaskListItem(event: any, taskListItemProps: any): void {
    this.context.move(`/tasks/${taskListItemProps.task.id}/edit?label-id=${taskListItemProps.task.labelId}`);
  }

  private _handleClickDestroyButton(event: any, taskListItemProps: any): void {
    event.stopPropagation();
    this.props.actions.destroyTask(taskListItemProps.task);
  }
}
