import * as PropTypes from 'prop-types';
import * as React from 'react';

import FlatButton from 'presentations/components/FlatButton';
import { Logo } from 'presentations/components/Logo';
import { Container } from 'presentations/containers/Container';
import { queryString } from 'utils/queryString';
import { tokenManager } from 'utils/tokenManager';

const API_SERVER_HOST: string = process.env.API_SERVER_HOST || 'http://127.0.0.1:3001';

export class LoginMobilePage extends Container<{}, {}> {
  public static contextTypes: { move: any } = {
    move: PropTypes.func,
  };

  private onClickLink: any;

  constructor(props: any) {
    super(props);

    this.onClickLink = this.handleClickLink.bind(this);
  }

  public componentWillMount(): void {
    if (typeof window === 'object') {
      const query: any = queryString.parse(window.location.search);
      const token: string = query.token;

      if (token) {
        tokenManager.set(token);
        this.context.move('/');
      }
    }
  }

  public render(): any {
    return (
      <section className="page login-mobile-page">
        <section className="login-mobile-page--content">
          <Logo type="logo_typography" />
          <p className="login-mobile-page--content--description">Sign up to manage and share your tasks.</p>
          <FlatButton
            className="login-mobile-page--flat-button login-mobile-page--flat-button__facebook"
            href={`${API_SERVER_HOST}/auth/facebook`}
            onClick={this.onClickLink}
          >
            {'LOG IN WITH FACEBOOK'}
          </FlatButton>
          {process.env.NODE_ENV === 'production' ? null : (
            <FlatButton
              className="login-mobile-page--flat-button"
              href={`${API_SERVER_HOST}/auth/tester`}
              onClick={this.onClickLink}
            >
              {'LOG IN AS TESTER'}
            </FlatButton>
          )}
        </section>
      </section>
    );
  }

  private handleClickLink(event: any): void {
    const href: string = event.currentTarget.href;
    event.preventDefault();
    window.location.href = href;
  }
}
