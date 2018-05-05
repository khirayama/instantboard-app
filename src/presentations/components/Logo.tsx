import * as React from 'react';

/*
 * Support icons
 * - logo
 * - typography
 * - logo_typography
*/

export class Logo extends React.Component<any, any> {
  public render(): any {
    const { type } = this.props;

    switch (type) {
      case 'logo': {
        return (
          <span className="logo logo__logo">
            <img src="/images/logo/logo.svg" alt="Instantboard" />
          </span>
        );
      }
      case 'typography': {
        return (
          <span className="logo logo__typography">
            <img src="/images/logo/typography.svg" alt="Instantboard" />
          </span>
        );
      }
      case 'logo_typography': {
        return (
          <span className="logo logo__logo-typography">
            <img src="/images/logo/logo_typography.svg" alt="Instantboard" />
          </span>
        );
      }
      default: {
        return type;
      }
    }
  }
}
