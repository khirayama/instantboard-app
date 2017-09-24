import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  fetchLabel,
} from '../../action-creators/label';
import {
  pollRequest,
} from '../../action-creators/request';
import {
  destroyTask,
  fetchTask,
  pollTask,
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
import poller from '../../utils/poller';
import Container from '../container';
import TaskList from './task-list';

export default class TaskIndexPage extends Container<IContainerProps, IState> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickCreateLabelButton: any;

  private handleChangeIndex: any;

  constructor(props: any) {
    super(props);

    this.actions = {
      pollTask: () => {
        pollTask(this.dispatch);
      },
      pollRequest: () => {
        pollRequest(this.dispatch, {status: 'pending'});
      },
      fetchLabel: () => {
        fetchLabel(this.dispatch).then((action: IAction) => {
          const labels = action.payload.labels;
          for (const label of labels) {
            if (label.requests.length > 1) {
              poller.add(this.actions.pollTask, 3000);
              break;
            }
          }
        });
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
    poller.add(this.actions.pollRequest, 3000);
  }

  public componentWillUnmount() {
    poller.remove(this.actions.pollTask);
    poller.remove(this.actions.pollRequest);
    super.componentWillUnmount();
  }

  public render() {
    const ui = this.state.ui;
    const labels = this.state.labels.filter((label: ILabel) => label.visibled);
    const tasks = this.state.tasks;
    const currentLabel: ILabel|undefined = labels[this.state.index];

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
      const recycleTableContents = labels.map((label: ILabel, index: number) => {
        const groupedTasks = tasks.filter((task: ITask) => {
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
            {labels.map((label: ILabel, index: number) => {
              return <RecycleTableListItem key={label.id} index={index}>{label.name}</RecycleTableListItem>;
            })}
          </RecycleTableList>
          <RecycleTableContentList>{recycleTableContents}</RecycleTableContentList>
        </RecycleTable>
      );
    }

    return (
      <section className="page task-index-page">
        <TabNavigationContent>{contentElement}</TabNavigationContent>
        <TabNavigation
          index={0}
          addTabLinkPath={(currentLabel) ? `/tasks/new?label-id=${currentLabel.id}` : '/tasks/new'}
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
