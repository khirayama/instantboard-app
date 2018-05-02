import * as React from 'react';

import { Icon } from 'presentations/components/Icon';
import { Link } from 'router/Link';

export class IconLink extends React.Component<any, any> {
  public render(): JSX.Element {
    const props: any = { ...this.props };
    const className: string = 'icon-link';
    const iconType: string = props.iconType;
    props.className = props.className ? `${props.className} ${className}` : className;

    delete props.iconType;

    if (props.to) {
      return (
        <Link {...props}>
          <Icon type={iconType} />
          <span>{props.children}</span>
        </Link>
      );
    } else {
      return (
        <span {...props}>
          <Icon type={iconType} />
          <span>{props.children}</span>
        </span>
      );
    }
  }
}
