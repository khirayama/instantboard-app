import * as PropTypes from 'prop-types';
import * as React from 'react';

import { context } from 'router/context';

interface ILinkProps {
  to: string;
  className?: string;
}

export class Link extends React.Component<ILinkProps> {
  public render(): JSX.Element {
    const { children, className, to } = this.props;

    /* tslint:disable:react-this-binding-issue */
    return (
      <context.Consumer>
        {({ move }: any): JSX.Element => {
          return (
            <a
              href={to}
              className={className}
              onClick={(event: any): void => {
                event.preventDefault();
                event.stopPropagation();
                move(to);
              }}
            >
              {children}
            </a>
          );
        }}
      </context.Consumer>
    );
    /* tslint:enable:react-this-binding-issue */
  }
}
