import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Indicator extends React.Component<any, any> {
  public render() {
    const TRANSITION_TIME = 200;
    const active = this.props.active;
    const contentElement = (active) ? (
      <div className="indicator">
        <svg>
          <defs>
            <linearGradient id="indicator-gradient">
              <stop className="indicator-color1" offset="0%"/>
              <stop className="indicator-color2" offset="33.4%"/>
              <stop className="indicator-color3" offset="100%"/>
            </linearGradient>
          </defs>
          <rect id="indicator" x="0" y="0" width="100%" height="100%" fill="none"/>
        </svg>
      </div>
    ) : null;

    return (
      <ReactCSSTransitionGroup
        transitionName="indicator"
        transitionAppear={true}
        transitionAppearTimeout={TRANSITION_TIME}
        transitionEnterTimeout={TRANSITION_TIME}
        transitionLeaveTimeout={TRANSITION_TIME}
      >
        {contentElement}
      </ReactCSSTransitionGroup>
    );
  }
}
