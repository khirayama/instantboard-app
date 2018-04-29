import * as classNames from 'classnames';
import * as React from 'react';

import { Icon } from 'presentations/components/Icon';
import { LinkText } from 'presentations/components/LinkText';
import { ListItem } from 'presentations/components/ListItem';

export class TaskListItem extends React.Component<any, any> {
  private onClickCompleteButton: any;

  private onClickTaskListItem: any;

  private onClickDestroyButton: any;

  constructor(props: any) {
    super(props);

    this.onClickCompleteButton = this.handleClickCompleteButton.bind(this);
    this.onClickTaskListItem = this.handleClickTaskListItem.bind(this);
    this.onClickDestroyButton = this.handleClickDestroyButton.bind(this);
  }

  public render(): JSX.Element {
    const { task, onClickCompleteButton, onClickTaskListItem, onClickDestroyButton } = this.props;

    const props: any = { ...this.props };
    delete props.task;
    delete props.onClickCompleteButton;
    delete props.onClickTaskListItem;
    delete props.onClickDestroyButton;

    return (
      <ListItem
        {...props}
        className={classNames('task-list-item', { 'task-list-item__completed': task.completed })}
        onClick={this.onClickTaskListItem}
      >
        <div role="button" className="task-list-item--complete-button" onClick={this.onClickCompleteButton}>
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
        <div role="button" className="task-list-item--destroy-button" onClick={this.onClickDestroyButton}>
          <Icon type="remove" active={task.completed} />
        </div>
      </ListItem>
    );
  }

  public handleClickCompleteButton(event: React.MouseEvent<HTMLElement>): void {
    const { onClickCompleteButton } = this.props;

    if (onClickCompleteButton) {
      onClickCompleteButton(event, this.props, this.state);
    }
  }

  public handleClickTaskListItem(event: React.MouseEvent<HTMLElement>): void {
    const { onClickTaskListItem } = this.props;

    if (onClickTaskListItem) {
      onClickTaskListItem(event, this.props, this.state);
    }
  }

  public handleClickDestroyButton(event: React.MouseEvent<HTMLElement>): void {
    const { onClickDestroyButton } = this.props;

    if (onClickDestroyButton) {
      onClickDestroyButton(event, this.props, this.state);
    }
  }
}
