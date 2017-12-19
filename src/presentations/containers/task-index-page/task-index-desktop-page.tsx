import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  fetchLabel,
} from '../../../action-creators/label';
import {
  pollRequest,
} from '../../../action-creators/request';
import {
  destroyTask,
  fetchTask,
  pollTask,
  sortTask,
  updateTask,
} from '../../../action-creators/task';
import poller from '../../../utils/poller';
import ApplicationContent from '../../components/application-header/application-content';
import ApplicationHeader from '../../components/application-header/application-header';
import Icon from '../../components/icon';
import IconLink from '../../components/icon-link';
import Indicator from '../../components/indicator';
import LayeredChildList from '../../components/layered-list/layered-child-list';
import LayeredChildListItem from '../../components/layered-list/layered-child-list-item';
import LayeredList from '../../components/layered-list/layered-list';
import LayeredParentList from '../../components/layered-list/layered-parent-list';
import LayeredParentListItem from '../../components/layered-list/layered-parent-list-item';
import LoadingContent from '../../components/loading-content';
import NoLabelContent from '../../components/no-label-content';
import NoTaskContent from '../../components/no-task-content';
import TaskList from '../../components/task-list';
import TaskListItem from '../../components/task-list-item';
import Container from '../container';

interface ITaskIndexDesktopPageState {
  index: number;
}

export default class TaskIndexDesktopPage extends Container<{}, ITaskIndexDesktopPageState> {
  public static contextTypes: {move: any} = {
    move: PropTypes.func,
  };

  private handleChangeIndex: (index: number) => void;

  private handleSortTaskList: (from: number, to: number, taskListProps: any) => void;

  private handleClickCompleteButton: (event: React.MouseEvent<HTMLElement>, taskListItemProps: any) => void;

  private handleClickTaskListItem: (event: React.MouseEvent<HTMLElement>, taskListItemProps: any) => void;

  private handleClickDestroyButton: (event: React.MouseEvent<HTMLElement>, taskListItemProps: any) => void;

  constructor(props: IContainerProps) {
    super(props);

    const initialState: ITaskIndexDesktopPageState = {
      index: this.loadIndex(),
    };

    this.state = Object.assign({}, this.getState(), initialState);

    this.actions = {
      pollTask: (): Promise<{}> => {
        return pollTask(this.dispatch);
      },
      pollRequest: (): Promise<{}> => {
        return pollRequest(this.dispatch, {status: 'pending'});
      },
      fetchLabel: (): Promise<{}> => {
        return fetchLabel(this.dispatch);
      },
      fetchTask: (): Promise<{}> => {
        return fetchTask(this.dispatch);
      },
      updateTask: (task: ITask): Promise<{}> => {
        return updateTask(this.dispatch, task);
      },
      destroyTask: (task: ITask): Promise<{}> => {
        return destroyTask(this.dispatch, task);
      },
      sortTask: (task: ITask, to: number): Promise<{}> => {
        return sortTask(this.dispatch, task, to);
      },
    };

    this.handleChangeIndex = this._handleChangeIndex.bind(this);
    this.handleSortTaskList = this._handleSortTaskList.bind(this);
    this.handleClickCompleteButton = this._handleClickCompleteButton.bind(this);
    this.handleClickTaskListItem = this._handleClickTaskListItem.bind(this);
    this.handleClickDestroyButton = this._handleClickDestroyButton.bind(this);
  }

  public componentDidMount() {
    this.actions.fetchTask();
    this.actions.fetchLabel().then((action: IAction) => {
      const labels = action.payload.labels;
      for (const label of labels) {
        if (label.requests.length > 1) {
          poller.add(this.actions.pollTask, 5000);
          break;
        }
      }
    });
    poller.add(this.actions.pollRequest, 5000);
  }

  public componentWillUnmount() {
    poller.remove(this.actions.pollTask);
    poller.remove(this.actions.pollRequest);

    super.componentWillUnmount();
  }

  public render() {
    const ui: IUI = this.state.ui;
    const labels: ILabel[] = this.state.labels.filter((label: ILabel) => label.visibled);
    const tasks: ITask[] = this.state.tasks;
    const requests: IRequest[] = this.state.requests;

    let contentElement: React.ReactNode|null = null;

    // Loading label - Show loading content
    //   No labels - Show no labels content
    //   Labels - Show layerd list view
    //     Loading tasks - Show skeleton
    //       No tasks - Show no tasks content
    //       Tasks - Show task list
    if (ui.isLoadingLabels && labels.length === 0) {
      contentElement = <LoadingContent/>;
    } else if (!ui.isLoadingLabels && labels.length === 0) {
      contentElement = <NoLabelContent/>;
    } else if (labels.length !== 0) {
      const layeredListContents = labels.map((label: ILabel, index: number) => {
        const groupedTasks: ITask[] = tasks.filter((task: ITask) => (task.labelId === label.id));

        let backgroundElement: React.ReactNode|null = null;
        if (ui.isLoadingTasks && groupedTasks.length === 0) {
          backgroundElement = <LoadingContent/>;
        } else if (groupedTasks.length === 0) {
          backgroundElement = <NoTaskContent label={label}/>;
        }

        return (
          <LayeredChildListItem key={label.id} index={index}>
            <TaskList
              className="task-list"
              tasks={groupedTasks}
              onSort={this.handleSortTaskList}
            >
              {groupedTasks.map((task: ITask): React.ReactNode => {
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
            {(groupedTasks.length === 0) ? null : (
              <IconLink
                to={`/tasks/new?label-id=${label.id}`}
                iconType="add"
                className="task-list--add-button"
              >
                {'ADD TASK'}
              </IconLink>
            ) }
            {backgroundElement}
          </LayeredChildListItem>
        );
      });

      contentElement = (
        <LayeredList
          index={this.state.index}
          onChange={this.handleChangeIndex}
        >
          <LayeredParentList>
            {labels.map((label: ILabel, index: number) => {
              return (
                <LayeredParentListItem
                  key={label.id}
                  index={index}
                >
                  <Icon type="label"/>
                  {label.name}
                </LayeredParentListItem>
              );
            })}
          </LayeredParentList>
          <LayeredChildList>
            {layeredListContents}
          </LayeredChildList>
        </LayeredList>
      );
    }

    const badges: number[] = (requests.length) ? [2] : [];

    return (
      <section className="page task-index-desktop-page">
        <Indicator active={(
          (ui.isLoadingLabels && labels.length !== 0) ||
          (ui.isLoadingTasks && tasks.length !== 0)
        )}/>
        <ApplicationHeader
          index={0}
          badges={badges}
        />
        <ApplicationContent>
          {contentElement}
        </ApplicationContent>
      </section>
    );
  }

  private loadIndex(): number {
    if (typeof window === 'object') {
      return JSON.parse(window.sessionStorage.getItem('__layered-list-index') || '0');
    }
    return 0;
  }

  private saveIndex(index: number): void {
    if (typeof window === 'object') {
      window.sessionStorage.setItem('__layered-list-index', JSON.stringify(index));
    }
  }

  private _handleChangeIndex(index: number): void {
    this.saveIndex(index);
    this.setState({index});
  }

  private _handleSortTaskList(from: number, to: number, taskListProps: any): void {
    const task = taskListProps.tasks[from];

    if (task.priority !== to) {
      this.actions.sortTask(task, to);
    }
  }

  private _handleClickCompleteButton(event: React.MouseEvent<HTMLElement>, taskListItemProps: any): void {
    event.stopPropagation();

    this.actions.updateTask({
      id: taskListItemProps.task.id,
      completed: !taskListItemProps.task.completed,
    });
  }

  private _handleClickTaskListItem(event: React.MouseEvent<HTMLElement>, taskListItemProps: any): void {
    this.context.move(`/tasks/${taskListItemProps.task.id}/edit?label-id=${taskListItemProps.task.labelId}`);
  }

  private _handleClickDestroyButton(event: React.MouseEvent<HTMLElement>, taskListItemProps: any): void {
    event.stopPropagation();
    this.actions.destroyTask(taskListItemProps.task);
  }
}
