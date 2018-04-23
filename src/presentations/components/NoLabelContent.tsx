import * as React from 'react';

import { IconLink } from 'presentations/components/IconLink';

export class NoLabelContent extends React.Component<any, any> {
  public render(): any {
    return (
      <div className="no-label-content">
        <IconLink to="/labels/new" iconType="add">
          {'ADD LABEL'}
        </IconLink>
      </div>
    );
  }
}
