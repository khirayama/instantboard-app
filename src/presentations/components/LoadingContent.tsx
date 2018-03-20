import Spinner from 'presentations/components/Spinner';
import * as React from 'react';

export default class LoadingContent extends React.Component<any, any> {
  public render() {
    return (
      <div className="loading-content">
        <div className="loading-content--spinner">
          <Spinner />
        </div>
      </div>
    );
  }
}
