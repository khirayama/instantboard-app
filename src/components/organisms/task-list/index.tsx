import * as PropTypes from 'prop-types';
import * as React from 'react';
import List from '../../atoms/list/list';
import IconLink from '../../molecules/icon-link';
import LoadingContent from '../../molecules/loading-content';
import NoTaskContent from '../no-task-content';
import TaskListItem from '../task-list-item';

export default class TaskList extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

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

    const handleSortTaskList = (from: number, to: number) => {
      const tasks = this.props.tasks;
      const task = tasks[from];

      if (task.priority !== to) {
        this.props.actions.sortTask(task, to);
      }
    };

    const handleClickCompleteButton = (event: any, props: any) => {
      event.stopPropagation();

      this.props.actions.updateTask({
        id: props.task.id,
        completed: !props.task.completed,
      });
    };

    const handleClickTaskListItem = (event: any, props: any) => {
      this.context.move(`/tasks/${props.task.id}/edit?label-id=${props.task.labelId}`);
    };

    const handleClickDestroyButton = (event: any, props: any) => {
      event.stopPropagation();

      this.props.actions.destroyTask(props.task);
    };

    return (
      <span>
        <List
          parentElement={parentElement}
          className="task-list"
          onSort={handleSortTaskList}
        >
          {tasks.map((task: any) => {
            return (
              <TaskListItem
                key={task.id}
                task={task}
                onClickCompleteButton={handleClickCompleteButton}
                onClickTaskListItem={handleClickTaskListItem}
                onClickDestroyButton={handleClickDestroyButton}
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
}
