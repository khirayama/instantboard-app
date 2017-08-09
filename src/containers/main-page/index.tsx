import * as React from 'react';
import Container from '../container';
import Link from '../../router/link';

export default class MainPage extends Container {
  public render() {
    return (
      <div>
        <h1>Main Page!</h1>
        <div>
        <Link to="/tasks/new">to TaskPage</Link>
        </div>
        <div>
        <Link to="/tasks/18/edit">to TaskPage</Link>
        </div>
      </div>
    );
  }
}
