import * as React from 'react';
import IconLink from '../icon-link';

export default class NoTaskContent extends React.Component<any, any> {
  public render() {
    const label = this.props.label;

    return (
      <div className="no-task-content">
        <IconLink
          to={`/tasks/new?label-id=${label.id}`}
          iconType="add"
        >ADD TASK
        </IconLink>
      </div>
    );
  }
}
