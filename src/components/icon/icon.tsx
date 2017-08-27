import * as classNames from 'classnames';
import * as React from 'react';

/*
 * Support icons
 * - check
*/

export default class Icon extends React.Component<any, any> {
  public render() {
    let icon: any = null;
    const strokeWidth = 2;

    const type = this.props.type;

    switch (type) {
      case 'check': {
        icon = (
          <g stroke="none" fill="none">
            <circle className="icon__check--circle"/>
            <circle className="icon__check--circle--inner"/>
          </g>
        );
        break;
      }
      case 'remove': {
        icon = (
          <g stroke="none" fill="none">
            <rect className="icon__remove--rect"/>
          </g>
        );
        break;
      }
    }
    return (
      <svg className={classNames(`icon__${type}`, "icon", {"icon__active": this.props.active})} viewBox="0 0 100 100">
        {icon}
      </svg>
    );
  }
}
