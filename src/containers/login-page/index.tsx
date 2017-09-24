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
      <section>
        <h1>Instantboard</h1>
        <a
          href={`${API_SERVER_HOST}/auth/facebook`}
          onClick={this.handleClickLoginButton}
        >Login with Facebook</a>
        <a
          href={`${API_SERVER_HOST}/auth/tester`}
          onClick={this.handleClickLoginButton}
        >Login as tester</a>
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
