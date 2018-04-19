import * as classNames from 'classnames';
import * as React from 'react';

import Icon from 'presentations/components/Icon';
import LinkText from 'presentations/components/LinkText';
import ListItem from 'presentations/components/ListItem';

export class TaskListItem extends React.Component<any, any> {
  public render(): any {
    const { task, onClickCompleteButton, onClickTaskListItem, onClickDestroyButton } = this.props;

    const handleClickCompleteButton: any = (event: any): void => {
      if (onClickCompleteButton) {
        onClickCompleteButton(event, this.props, this.state);
      }
    };

    const handleClickTaskListItem: any = (event: any): void => {
      if (onClickTaskListItem) {
        onClickTaskListItem(event, this.props, this.state);
      }
    };

    const handleClickDestroyButton: any = (event: any): void => {
      if (onClickDestroyButton) {
        onClickDestroyButton(event, this.props, this.state);
      }
    };

    const props: any = { ...this.props };
    delete props.task;
    delete props.onClickCompleteButton;
    delete props.onClickTaskListItem;
    delete props.onClickDestroyButton;

    return (
      <ListItem
        {...props}
        className={classNames('task-list-item', { 'task-list-item__completed': task.completed })}
        onClick={handleClickTaskListItem}
      >
        <div className="task-list-item--complete-button" onClick={handleClickCompleteButton}>
          <Icon type="check" active={task.completed} />
        </div>
        {task.schedule ? (
          <span className="task-list-item--schedule--container">
            <span
              className={classNames(
                'task-list-item--schedule',
                `task-list-item--schedule__${task.schedule.shortMonthName.toLowerCase()}`,
              )}
            >
              <span className="task-list-item--schedule--month">{task.schedule.shortMonthName}</span>
              <span className="task-list-item--schedule--date">{task.schedule.date}</span>
              <span className="task-list-item--schedule--day">{task.schedule.shortDayName}</span>
            </span>
          </span>
        ) : null}
        <div className="task-list-item--content">
          <div className="task-list-item--content--text">
            <LinkText>{task.text}</LinkText>
          </div>
        </div>
        <div className="task-list-item--destroy-button" onClick={handleClickDestroyButton}>
          <Icon type="remove" active={task.completed} />
        </div>
      </ListItem>
    );
  }
}
