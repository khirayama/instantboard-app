import * as React from 'react';
import Spinner from '../../atoms/spinner';

export default class LoadingContent extends React.Component<any, any> {
  public render() {
    return (
      <div className="loading-content">
        <div className="loading-content--spinner">
          <Spinner/>
        </div>
      </div>
    );
  }
}
