import * as React from 'react';

import { IconLink } from 'presentations/components/IconLink';

export class NoTaskContent extends React.Component<any, any> {
  public render(): any {
    const { label, onClickAddTaskButton } = this.props;

    return (
      <div className="no-task-content">
        <IconLink iconType="add" onClick={onClickAddTaskButton} to={`/tasks/new?label-id=${label.id}`}>
          ADD TASK
        </IconLink>
      </div>
    );
  }
}
