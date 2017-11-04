import * as React from 'react';
import LoginPage from '../../components/pages/login-page';
import Container from '../container';

export default class LoginPageContainer extends Container<any, any> {
  public render() {
    return <LoginPage />;
  }
}
