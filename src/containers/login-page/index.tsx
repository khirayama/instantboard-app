import * as React from 'react';
import Container from '../container';
import * as queryString from 'query-string';
import tokenManager from '../../utils/token-manager';

const API_SERVER_PORT = process.env.API_SERVER_PORT;
const API_SERVER_HOSTNAME = process.env.API_SERVER_HOSTNAME;
const API_SERVER_HOST = `http://${API_SERVER_HOSTNAME}:${API_SERVER_PORT}`;

export default class LoginPage extends Container<any, any> {
  private handleClickLoginWithFacebookButton: any;

  constructor(props: any) {
    super(props);

    this.handleClickLoginWithFacebookButton = this._handleClickLoginWithFacebookButton.bind(this);
  }

  public componentWillMount() {
    if (typeof window === 'object' && window.opener) {
      const query = queryString.parse(window.location.search);
      const token = query.token;
      tokenManager.set(token);
      window.opener.location.href = window.opener.location.origin;
      window.close();
    }
  }

  private _handleClickLoginWithFacebookButton(event: any) {
    event.preventDefault();
    const position = 120;
    const width = Math.max(window.parent.screen.width - (position * 2), 375);
    const height = Math.max(window.parent.screen.height - (position * 2), 667);
    window.open(event.currentTarget.href, '_blank', `top=${position}, left=${position}, width=${width}, height=${height}, menubar=no, toolbar=no, location=yes, status=no, resizable=yes, scrollbars=yes`);
  }

  public render() {
    return (
      <section>
        <h1>Instantboard</h1>
        <a href={`${API_SERVER_HOST}/auth/facebook`} onClick={this.handleClickLoginWithFacebookButton}>Login with Facebook</a>
      </section>
    );
  }
}
