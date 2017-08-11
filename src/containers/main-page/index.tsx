import * as React from 'react';
import Link from '../../router/link';
import Container from '../container';

export default class MainPage extends Container {
  public render() {
    return (
      <section className="page main-page">
        <h1>Main Page!</h1>
        <div>
        <Link to="/tasks/new">to TaskPage</Link>
        </div>
        <div>
        <Link to="/tasks/18/edit">to TaskPage</Link>
        </div>
      </section>
    );
  }
}
