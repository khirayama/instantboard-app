import IconLink from 'presentations/components/IconLink';
import * as React from 'react';

export default class NoLabelContent extends React.Component<any, any> {
  public render() {
    return (
      <div className="no-label-content">
        <IconLink to="/labels/new" iconType="add">
          {'ADD LABEL'}
        </IconLink>
      </div>
    );
  }
}
