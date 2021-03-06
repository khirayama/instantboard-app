import * as React from 'react';

import { FlatButton } from 'presentations/components/FlatButton';
import { Logo } from 'presentations/components/Logo';
import { Container, IContainerProps } from 'presentations/containers/Container';
import { context } from 'router/Navigator';
import { queryString } from 'utils/queryString';
import { tokenManager } from 'utils/tokenManager';

const API_SERVER_HOST: string = process.env.API_SERVER_HOST || 'http://127.0.0.1:3001'; // tslint:disable-line:no-http-string

export class LoginMobilePage extends Container<{}, {}> {
  private move: any;

  private onClickLink: () => void;

  constructor(props: IContainerProps) {
    super(props);

    this.onClickLink = this.handleClickLink.bind(this);
  }

  public componentDidMount(): void {
    if (typeof window === 'object') {
      const query: { [key: string]: string } = queryString.parse(window.location.search);
      const token: string = query.token;

      if (token) {
        tokenManager.set(token);
        this.move('/');
      }
    }
  }

  public render(): JSX.Element {
    return (
      <section className="page login-mobile-page">
        <context.Consumer>{this.bindContext.bind(this)}</context.Consumer>
        <section className="login-mobile-page--content">
          <p className="login-mobile-page--content--logo">
            <Logo type="logo_typography" />
          </p>
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

  private bindContext(ctx: any): null {
    this.move = ctx.move;

    return null;
  }

  private handleClickLink(event: React.MouseEvent<HTMLAnchorElement>): void {
    const href: string = event.currentTarget.href;
    event.preventDefault();
    window.location.href = href;
  }
}
