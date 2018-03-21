import FlatButton from 'presentations/components/FlatButton';
import Logo from 'presentations/components/Logo';
import Container from 'presentations/containers/Container';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { queryString } from 'utils/queryString';
import { tokenManager } from 'utils/tokenManager';

const API_SERVER_HOST = process.env.API_SERVER_HOST || 'http://127.0.0.1:3001';

export default class LoginMobilePage extends Container<{}, {}> {
  private handleClickLink: any;

  public static contextTypes: { move: any } = {
    move: PropTypes.func,
  };

  constructor(props: any) {
    super(props);

    this.handleClickLink = this._handleClickLink.bind(this);
  }

  public componentWillMount() {
    if (typeof window === 'object') {
      const query: any = queryString.parse(window.location.search);
      const token: string = query.token;

      if (token) {
        tokenManager.set(token);
        this.context.move('/');
      }
    }
  }

  public render() {
    return (
      <section className="page login-mobile-page">
        <section className="login-mobile-page--content">
          <Logo type="logo_typography" />
          <p className="login-mobile-page--content--description">Sign up to manage and share your tasks.</p>
          <FlatButton
            className="login-mobile-page--flat-button login-mobile-page--flat-button__facebook"
            href={`${API_SERVER_HOST}/auth/facebook`}
            onClick={this.handleClickLink}
          >
            {'LOG IN WITH FACEBOOK'}
          </FlatButton>
          {process.env.NODE_ENV === 'production' ? null : (
            <FlatButton
              className="login-mobile-page--flat-button"
              href={`${API_SERVER_HOST}/auth/tester`}
              onClick={this.handleClickLink}
            >
              {'LOG IN AS TESTER'}
            </FlatButton>
          )}
        </section>
      </section>
    );
  }

  private _handleClickLink(event: any) {
    const href = event.currentTarget.href;
    event.preventDefault();
    window.location.href = href;
  }
}
