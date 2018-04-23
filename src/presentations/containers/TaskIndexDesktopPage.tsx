import * as PropTypes from 'prop-types';
import * as React from 'react';

import { fetchLabel } from 'action-creators/label';
import { pollRequest } from 'action-creators/request';
import { destroyTask, fetchTask, pollTask, sortTask, updateTask } from 'action-creators/task';
import { ApplicationContent } from 'presentations/components/ApplicationContent';
import ApplicationHeader from 'presentations/components/ApplicationHeader';
import Icon from 'presentations/components/Icon';
import IconLink from 'presentations/components/IconLink';
import Indicator from 'presentations/components/Indicator';
import { LayeredChildList } from 'presentations/components/LayeredChildList';
import { LayeredChildListItem } from 'presentations/components/LayeredChildListItem';
import { LayeredList } from 'presentations/components/LayeredList';
import { LayeredParentList } from 'presentations/components/LayeredParentList';
import { LayeredParentListItem } from 'presentations/components/LayeredParentListItem';
import { LoadingContent } from 'presentations/components/LoadingContent';
import { NoLabelContent } from 'presentations/components/NoLabelContent';
import { NoTaskContent } from 'presentations/components/NoTaskContent';
import { TaskList } from 'presentations/components/TaskList';
import { TaskListItem } from 'presentations/components/TaskListItem';
import { Container } from 'presentations/containers/Container';
import { poller } from 'utils/poller';

interface ITaskIndexDesktopPageState {
  index: number;
}

export class TaskIndexDesktopPage extends Container<{}, ITaskIndexDesktopPageState> {
  public static contextTypes: { move: any } = {
    move: PropTypes.func,
  };

  private onChangeIndex: (index: number) => void;

  private onSortTaskList: (fromIndex: number, toIndex: number, taskListProps: any) => void;

  private onClickCompleteButton: (event: React.MouseEvent<HTMLElement>, taskListItemProps: any) => void;

  private onClickTaskListItem: (event: React.MouseEvent<HTMLElement>, taskListItemProps: any) => void;

  private onClickDestroyButton: (event: React.MouseEvent<HTMLElement>, taskListItemProps: any) => void;

  constructor(props: IContainerProps) {
    super(props);

    const initialState: ITaskIndexDesktopPageState = {
      index: this.loadIndex(),
    };

    this.state = { ...this.getState(), ...initialState };

    this.actions = {
      pollTask: (): Promise<IAction> => {
        return pollTask(this.dispatch);
      },
      pollRequest: (): Promise<IAction> => {
        return pollRequest(this.dispatch, { status: 'pending' });
      },
      fetchLabel: (): Promise<IAction> => {
        return fetchLabel(this.dispatch);
      },
      fetchTask: (): Promise<IAction> => {
        return fetchTask(this.dispatch);
      },
      updateTask: (params: {
        id: number;
        labelId?: number;
        content?: string;
        completed?: boolean;
      }): Promise<IAction> => {
        return updateTask(this.dispatch, params);
      },
      destroyTask: (params: { id: number }): Promise<IAction> => {
        return destroyTask(this.dispatch, params);
      },
      sortTask: (
        params: {
          id: number;
          labelId: number;
          priority: number;
        },
        to: number,
      ): Promise<IAction> => {
        return sortTask(this.dispatch, params, to);
      },
    };

    this.onChangeIndex = this.handleChangeIndex.bind(this);
    this.onSortTaskList = this.handleSortTaskList.bind(this);
    this.onClickCompleteButton = this.handleClickCompleteButton.bind(this);
    this.onClickTaskListItem = this.handleClickTaskListItem.bind(this);
    this.onClickDestroyButton = this.handleClickDestroyButton.bind(this);
  }

  public componentDidMount(): void {
    this.actions.fetchTask();
    this.actions.fetchLabel().then((action: IAction) => {
      const labels: ILabel[] = action.payload.labels;
      for (const label of labels) {
        if (label.members.length > 1) {
          poller.add(this.actions.pollTask, 3000);
          break;
        }
      }
    });
    this.actions.pollRequest();
    poller.add(this.actions.pollRequest, 3000);
  }

  public componentWillUnmount(): void {
    poller.remove(this.actions.pollTask);
    poller.remove(this.actions.pollRequest);

    super.componentWillUnmount();
  }

  public render(): any {
    const ui: IUI = this.state.ui;
    const labels: ILabel[] = this.state.labels.filter((label: ILabel) => label.visibled);
    const tasks: ITask[] = this.state.tasks;
    const requests: IRequest[] = this.state.requests;

    let contentElement: React.ReactNode | null = null;

    // Loading label - Show loading content
    //   No labels - Show no labels content
    //   Labels - Show layerd list view
    //     Loading tasks - Show skeleton
    //       No tasks - Show no tasks content
    //       Tasks - Show task list
    if (ui.isLoadingLabels && labels.length === 0) {
      contentElement = <LoadingContent />;
    } else if (!ui.isLoadingLabels && labels.length === 0) {
      contentElement = <NoLabelContent />;
    } else if (labels.length !== 0) {
      const layeredListContents: any[] = labels.map((label: ILabel, index: number) => {
        const groupedTasks: ITask[] = tasks.filter((task: ITask) => task.labelId === label.id);

        let backgroundElement: React.ReactNode | null = null;
        if (ui.isLoadingTasks && groupedTasks.length === 0) {
          backgroundElement = <LoadingContent />;
        } else if (groupedTasks.length === 0) {
          backgroundElement = <NoTaskContent label={label} />;
        }

        return (
          <LayeredChildListItem key={label.id} index={index}>
            <TaskList className="task-list" tasks={groupedTasks} onSort={this.onSortTaskList}>
              {groupedTasks.map((task: ITask): React.ReactNode => {
                return (
                  <TaskListItem
                    key={task.id}
                    task={task}
                    onClickCompleteButton={this.onClickCompleteButton}
                    onClickTaskListItem={this.onClickTaskListItem}
                    onClickDestroyButton={this.onClickDestroyButton}
                  />
                );
              })}
            </TaskList>
            {groupedTasks.length === 0 ? null : (
              <IconLink to={`/tasks/new?label-id=${label.id}`} iconType="add" className="task-list--add-button">
                {'ADD TASK'}
              </IconLink>
            )}
            {backgroundElement}
          </LayeredChildListItem>
        );
      });

      contentElement = (
        <LayeredList index={this.state.index} onChange={this.onChangeIndex}>
          <LayeredParentList>
            {labels.map((label: ILabel, index: number) => {
              return (
                <LayeredParentListItem key={label.id} index={index}>
                  <Icon type="label" />
                  {label.name}
                </LayeredParentListItem>
              );
            })}
          </LayeredParentList>
          <LayeredChildList>{layeredListContents}</LayeredChildList>
        </LayeredList>
      );
    }

    const badges: number[] = requests.length ? [2] : [];

    return (
      <section className="page task-index-desktop-page">
        <Indicator active={(ui.isLoadingLabels && labels.length !== 0) || (ui.isLoadingTasks && tasks.length !== 0)} />
        <ApplicationHeader index={0} badges={badges} />
        <ApplicationContent>{contentElement}</ApplicationContent>
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

  private handleChangeIndex(index: number): void {
    this.saveIndex(index);
    this.setState({ index });
  }

  private handleSortTaskList(fromIndex: number, toIndex: number, taskListProps: any): void {
    const task: ITask = taskListProps.tasks[fromIndex];

    if (task.priority !== toIndex) {
      this.actions.sortTask(
        {
          id: task.id,
          labelId: task.labelId,
          priority: task.priority,
        },
        toIndex,
      );
    }
  }

  private handleClickCompleteButton(event: React.MouseEvent<HTMLElement>, taskListItemProps: any): void {
    event.stopPropagation();

    this.actions.updateTask({
      id: taskListItemProps.task.id,
      completed: !taskListItemProps.task.completed,
    });
  }

  private handleClickTaskListItem(event: React.MouseEvent<HTMLElement>, taskListItemProps: any): void {
    this.context.move(`/tasks/${taskListItemProps.task.id}/edit?label-id=${taskListItemProps.task.labelId}`);
  }

  private handleClickDestroyButton(event: React.MouseEvent<HTMLElement>, taskListItemProps: any): void {
    event.stopPropagation();
    this.actions.destroyTask({
      id: taskListItemProps.task,
    });
  }
}
