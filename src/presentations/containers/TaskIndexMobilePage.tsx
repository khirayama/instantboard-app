import * as PropTypes from 'prop-types';
import * as React from 'react';

import { fetchLabel } from 'action-creators/label';
import { pollRequest } from 'action-creators/request';
import { createTask, destroyTask, fetchTask, pollTask, sortTask, updateTask } from 'action-creators/task';
import { IconLink } from 'presentations/components/IconLink';
import { Indicator } from 'presentations/components/Indicator';
import { LoadingContent } from 'presentations/components/LoadingContent';
import { NoLabelContent } from 'presentations/components/NoLabelContent';
import { NoTaskContent } from 'presentations/components/NoTaskContent';
import { RecycleTable } from 'presentations/components/RecycleTable';
import { RecycleTableContentList } from 'presentations/components/RecycleTableContentList';
import { RecycleTableContentListItem } from 'presentations/components/RecycleTableContentListItem';
import { RecycleTableList } from 'presentations/components/RecycleTableList';
import { RecycleTableListItem } from 'presentations/components/RecycleTableListItem';
import { Sheet } from 'presentations/components/Sheet';
import { TabNavigation } from 'presentations/components/TabNavigation';
import { TabNavigationContent } from 'presentations/components/TabNavigationContent';
import { TaskForm } from 'presentations/components/TaskForm';
import { TaskList } from 'presentations/components/TaskList';
import { TaskListItem } from 'presentations/components/TaskListItem';
import { Container, IContainerProps } from 'presentations/containers/Container';
import { poller } from 'utils/poller';

interface ITaskIndexMobilePageState {
  index: number;
  isTaskFormShown: boolean;
}

interface ITaskListProps {
  tasks: ITask[];
}

interface ITaskListItemProps {
  task: ITask;
}

export class TaskIndexMobilePage extends Container<IContainerProps, ITaskIndexMobilePageState & IState> {
  public static contextTypes: { move: PropTypes.Validator<void> } = {
    move: PropTypes.func,
  };

  private onChangeIndex: (index: number) => void;

  private onSortTaskList: (fromIndex: number, toIndex: number, taskListProps: ITaskListProps) => void;

  private onClickCompleteButton: (event: React.MouseEvent<HTMLElement>, taskListItemProps: ITaskListItemProps) => void;

  private onClickTaskListItem: (event: React.MouseEvent<HTMLElement>, taskListItemProps: ITaskListItemProps) => void;

  private onClickDestroyButton: (event: React.MouseEvent<HTMLElement>, taskListItemProps: ITaskListItemProps) => void;

  private onClickAddTaskButton: (event: React.MouseEvent<HTMLElement>) => void;

  private onSubmitTaskForm: (
    event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>,
    taskFormProps: any,
    taskFormState: any,
  ) => void;

  constructor(props: IContainerProps) {
    super(props);

    const initialState: ITaskIndexMobilePageState = {
      index: this.loadIndex(),
      isTaskFormShown: false,
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
      createTask: (params: { labelId: number; content: string }): Promise<{}> => {
        return createTask(this.dispatch, params);
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
    this.onClickAddTaskButton = this.handleClickAddTaskButton.bind(this);
    this.onSubmitTaskForm = this.handleSubmitTaskForm.bind(this);
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

  public render(): JSX.Element {
    const ui: IUI = this.state.ui;
    const labels: ILabel[] = this.state.labels.filter((label: ILabel) => label.visibled);
    const tasks: ITask[] = this.state.tasks;
    const requests: IRequest[] = this.state.requests;

    let contentElement: React.ReactNode | null = null;

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
      const recycleTableContents: React.ReactNode = labels.map((label: ILabel, index: number) => {
        const groupedTasks: ITask[] = tasks.filter((task: ITask) => task.labelId === label.id);

        let backgroundElement: React.ReactNode | null = null;
        if (ui.isLoadingTasks && groupedTasks.length === 0) {
          backgroundElement = <LoadingContent />;
        } else if (groupedTasks.length === 0) {
          backgroundElement = <NoTaskContent label={label} />;
        }
        const parentElement: Element = window.document.querySelectorAll('.recycle-table-content-list-item')[index];

        return (
          <RecycleTableContentListItem key={label.id} index={index}>
            <TaskList
              className="task-list"
              parentElement={parentElement}
              tasks={groupedTasks}
              onSort={this.onSortTaskList}
            >
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
              <IconLink iconType="add" onClick={this.onClickAddTaskButton}>
                ADD TASK
              </IconLink>
            )}
            {backgroundElement}
          </RecycleTableContentListItem>
        );
      });

      contentElement = (
        <RecycleTable index={this.state.index} onChange={this.onChangeIndex}>
          <RecycleTableList>
            {labels.map((label: ILabel, index: number): React.ReactNode => {
              return (
                <RecycleTableListItem key={label.id} index={index}>
                  {label.name}
                </RecycleTableListItem>
              );
            })}
          </RecycleTableList>
          <RecycleTableContentList>{recycleTableContents}</RecycleTableContentList>
        </RecycleTable>
      );
    }

    const badges: number[] = requests.length ? [2] : [];

    return (
      <section className="page task-index-mobile-page">
        <Indicator active={(ui.isLoadingLabels && labels.length !== 0) || (ui.isLoadingTasks && tasks.length !== 0)} />
        <TabNavigationContent>{contentElement}</TabNavigationContent>
        <TabNavigation index={0} badges={badges} />
        <Sheet isShown={this.state.isTaskFormShown}>
          <TaskForm labels={labels} selectedLabelId={labels[this.state.index].id} onSubmit={this.onSubmitTaskForm} />
        </Sheet>
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

  private handleChangeIndex(index: number): void {
    this.saveIndex(index);
    this.setState({ index });
  }

  private handleSortTaskList(fromIndex: number, toIndex: number, taskListProps: ITaskListProps): void {
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

  private handleClickCompleteButton(event: React.MouseEvent<HTMLElement>, taskListItemProps: ITaskListItemProps): void {
    event.stopPropagation();

    this.actions.updateTask({
      id: taskListItemProps.task.id,
      completed: !taskListItemProps.task.completed,
    });
  }

  private handleClickTaskListItem(event: React.MouseEvent<HTMLElement>, taskListItemProps: ITaskListItemProps): void {
    this.context.move(`/tasks/${taskListItemProps.task.id}/edit?label-id=${taskListItemProps.task.labelId}`);
  }

  private handleClickDestroyButton(event: React.MouseEvent<HTMLElement>, taskListItemProps: ITaskListItemProps): void {
    event.stopPropagation();
    this.actions.destroyTask({
      id: taskListItemProps.task.id,
    });
  }

  private handleClickAddTaskButton(event: React.MouseEvent<HTMLElement>): void {
    this.setState({ isTaskFormShown: true });
  }

  private handleSubmitTaskForm(
    event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>,
    taskFormProps: any,
    taskFormState: any,
  ): void {
    const content: string = taskFormState.content.trim();
    const id: number | null = null;

    // TODO: uiblock
    if (id === null) {
      this.actions
        .createTask({
          content,
          labelId: taskFormState.labelId,
        })
        .then(() => {
          this.setState({ isTaskFormShown: false });
        });
    } else {
      this.actions
        .updateTask({
          id,
          content,
          labelId: taskFormState.labelId,
        })
        .then(() => {
          this.setState({ isTaskFormShown: false });
        });
    }
  }
}
