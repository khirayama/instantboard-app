import * as React from 'react';

import { Spinner } from 'presentations/components/Spinner';

export class LoadingContent extends React.Component<any, any> {
  public render(): any {
    return (
      <div className="loading-content">
        <div className="loading-content--spinner">
          <Spinner />
        </div>
      </div>
    );
  }
}
