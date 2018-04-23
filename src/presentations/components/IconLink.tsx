import * as React from 'react';

import { Icon } from 'presentations/components/Icon';
import { Link } from 'router/Link';

export class IconLink extends React.Component<any, any> {
  public render(): JSX.Element {
    const props: any = { ...this.props };
    const className: string = 'icon-link';
    props.className = props.className ? `${props.className} ${className}` : className;

    return (
      <Link {...props}>
        <Icon type={props.iconType} />
        <span>{props.children}</span>
      </Link>
    );
  }
}
