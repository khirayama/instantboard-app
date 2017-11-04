import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import poller from '../../../utils/poller';
import Icon from '../../atoms/icon';
import Indicator from '../../atoms/indicator';
import RecycleTable from '../../atoms/recycle-table/recycle-table';
import RecycleTableContentList from '../../atoms/recycle-table/recycle-table-content-list';
import RecycleTableContentListItem from '../../atoms/recycle-table/recycle-table-content-list-item';
import RecycleTableList from '../../atoms/recycle-table/recycle-table-list';
import RecycleTableListItem from '../../atoms/recycle-table/recycle-table-list-item';
import LoadingContent from '../../molecules/loading-content';
import TabNavigation from '../../molecules/tab-navigation/tab-navigation';
import TabNavigationContent from '../../molecules/tab-navigation/tab-navigation-content';
import NoLabelContent from '../../organisms/no-label-content';
import TaskList from '../../organisms/task-list';

export default class TaskIndexPage extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleChangeIndex: any;

  constructor(props: any) {
    super(props);

    this.state = {
      index: this.loadIndex(),
    };

    this.handleChangeIndex = this._handleChangeIndex.bind(this);
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
        const groupedTasks = tasks.filter((task: ITask) => {
          return (task.labelId === label.id);
        });
        return (
          <RecycleTableContentListItem key={label.id} index={index}>
            <TaskList
              actions={this.props.actions}
              ui={ui}
              label={label}
              tasks={groupedTasks}
              index={index}
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
}
