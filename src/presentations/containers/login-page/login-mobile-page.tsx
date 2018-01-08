import * as PropTypes from 'prop-types';
import * as React from 'react';
import queryString from '../../../utils/query-string';
import tokenManager from '../../../utils/token-manager';
import FlatButton from '../../components/flat-button';
import Container from '../container';

const API_SERVER_HOST = process.env.API_SERVER_HOST || 'http://127.0.0.1:3001';

export default class LoginMobilePage extends Container<{}, {}> {
  public static contextTypes: { move: any } = {
    move: PropTypes.func,
  };

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
          <h1 className="login-mobile-page--content--heading">Instantboard</h1>
          <p className="login-mobile-page--content--description">Sign up to manage and share your tasks.</p>
          <FlatButton
            className="login-mobile-page--flat-button login-mobile-page--flat-button__facebook"
            href={`${API_SERVER_HOST}/auth/facebook`}
          >
            {'LOG IN WITH FACEBOOK'}
          </FlatButton>
          {process.env.NODE_ENV === 'production' ? null : (
            <FlatButton className="login-mobile-page--flat-button" href={`${API_SERVER_HOST}/auth/tester`}>
              {'LOG IN AS TESTER'}
            </FlatButton>
          )}
        </section>
      </section>
    );
  }
}
