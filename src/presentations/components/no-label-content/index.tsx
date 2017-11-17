import * as React from 'react';
import IconLink from '../icon-link';

export default class NoLabelContent extends React.Component<any, any> {
  public render() {
    return (
      <div className="no-label-content">
        <IconLink
          to="/labels/new"
          iconType="add"
        >ADD LABEL
        </IconLink>
      </div>
    );
  }
}
