import * as React from 'react';
import {SpinnerIcon} from '../../icon';

export default class LoadingContent extends React.Component<any, any> {
  public render() {
    return (
      <div className="loading-content">
        <div className="loading-content--spinner">
          <SpinnerIcon/>
        </div>
      </div>
    );
  }
}
