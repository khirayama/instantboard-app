import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Icon from '../../components/icon';
import LinkText from '../../components/link-text';
import {ListItem} from '../../components/list';

export default class TaskListItem extends React.Component<any, any> {
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
        className={classNames('task-list-item', {'task-list-item__completed': task.completed})}
        onClick={this.handleClickTaskListItem}
      >
        <div className="task-list-item--complete-button" onClick={this.handleClickCompleteButton}>
          <Icon type="check" active={task.completed}/>
        </div>
        {(task.schedule) ? (
          <span className="task-list-item--schedule--container">
            <span
              className={classNames(
                'task-list-item--schedule',
                `task-list-item--schedule__${task.schedule.shortMonthName.toLowerCase()}`,
              )}
            >
              <span className="task-list-item--schedule--month">
                {task.schedule.shortMonthName}
              </span>
              <span className="task-list-item--schedule--date">
                {task.schedule.date}
              </span>
              <span className="task-list-item--schedule--day">
                {task.schedule.shortDayName}
              </span>
            </span>
          </span>
        ) : null}
        <div className="task-list-item--content">
          <div className="task-list-item--content--text"><LinkText>{task.text}</LinkText></div>
        </div>
        <div className="task-list-item--destroy-button" onClick={this.handleClickDestroyButton}>
          <Icon type="remove" active={task.completed}/>
        </div>
      </ListItem>
    );
  }

  private _handleClickCompleteButton(event: any) {
    event.stopPropagation();

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

  private _handleClickDestroyButton(event: any) {
    event.stopPropagation();

    const task = this.props.task;
    const actions = this.props.actions;

    actions.destroyTask(task);
  }
}
