import * as PropTypes from 'prop-types';
import * as queryString from 'query-string';
import * as React from 'react';
import tokenManager from '../../utils/token-manager';
import Container from '../container';

const API_SERVER_HOST = process.env.API_SERVER_HOST || 'http://127.0.0.1:3001';

export default class LoginPage extends Container<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickLoginButton: any;

  constructor(props: any) {
    super(props);

    this.handleClickLoginButton = this._handleClickLoginButton.bind(this);
  }

  public componentWillMount() {
    if (typeof window === 'object' && window.opener) {
      const query = queryString.parse(window.location.search);
      const token = query.token;
      tokenManager.set(token);
      window.close();
    }
  }

  public render() {
    return (
      <section className="page login-page">
        <section className="login-page--content">
          <h1 className="login-page--content--heading">Instantboard</h1>
          <p className="login-page--content--description">Sign up to manage and share your tasks.</p>
          <div>
            <a
              className="login-page--content--login-button login-page--content--login-button__facebook"
              href={`${API_SERVER_HOST}/auth/facebook`}
              onClick={this.handleClickLoginButton}
            >Log in with Facebook</a>
          </div>
          {(process.env.NODE_ENV !== 'production') ? (
            <div>
              <a
                className="login-page--content--login-button"
                href={`${API_SERVER_HOST}/auth/tester`}
                onClick={this.handleClickLoginButton}
              >Log in as tester</a>
            </div>
          ) : null}
        </section>
      </section>
    );
  }

  private _handleClickLoginButton(event: any) {
    event.preventDefault();
    const position = 120;
    const width = Math.max(window.parent.screen.width - (position * 2), 375);
    const height = Math.max(window.parent.screen.height - (position * 2), 667);
    const win = window.open(
      event.currentTarget.href,
      '_blank',
      `
        top=${position},
        left=${position},
        width=${width},
        height=${height},
        menubar=no,
        toolbar=no,
        location=yes,
        status=no,
        resizable=yes,
        scrollbars=yes
      `,
    );

    win.addEventListener('unload', () => {
      // If don't use setTimeout,
      // Service layer can't get token using tokenManager.get
      setTimeout(() => {
        this.context.move('/');
      }, 100);
    });
  }
}
