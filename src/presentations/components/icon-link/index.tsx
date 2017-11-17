import * as React from 'react';
import Link from '../../../router/link';
import Icon from '../icon';

export default class IconLink extends React.Component<any, any> {
  public render() {
    const props: any = Object.assign({}, this.props);
    const className = 'icon-link';
    props.className = (props.className) ? props.className + ' ' + className : className;

    return (
      <Link {...props}>
        <Icon type={props.iconType}/>
        <span>{props.children}</span>
      </Link>
    );
  }
}
