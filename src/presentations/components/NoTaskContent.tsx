import * as React from 'react';
import IconLink from 'presentations/components/IconLink';

export default class NoTaskContent extends React.Component<any, any> {
  public render() {
    const { label } = this.props;

    return (
      <div className='no-task-content'>
        <IconLink to={`/tasks/new?label-id=${label.id}`} iconType='add'>
          {'ADD TASK'}
        </IconLink>
      </div>
    );
  }
}
