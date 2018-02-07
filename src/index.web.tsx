import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducers from './reducers';
import Navigator from './router/navigator';
import Router from './router/router';
import routes from './router/routes';
import initialState from './store/initial-state';
import Store from './store/store';
import tokenManager from './utils/token-manager';
import Tracker from './utils/tracker';

const store: Store = new Store(initialState, reducers, { session: true });
const router: Router = new Router(routes);
const tracker: Tracker = new Tracker(router);

tracker.send();

// Redirect
if (window.location.pathname !== '/login') {
  const token: string | null = tokenManager.get();
  if (!token) {
    window.location.href = '/login';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (process && process.env.NODE_ENV !== 'production') {
    console.log(`Start app at ${new Date()}.`);
  }

  const applicationMainElement: HTMLElement | null = window.document.querySelector('.application--main');
  if (applicationMainElement !== null) {
    const path: string = window.location.pathname;
    ReactDOM.render(
      <Navigator props={{ store }} router={router} tracker={tracker} path={path} />,
      applicationMainElement,
    );
  }

  const applicationLoadingElement: HTMLElement | null = window.document.querySelector('.application--loader');
  if (applicationLoadingElement !== null && applicationLoadingElement.parentNode) {
    applicationLoadingElement.parentNode.removeChild(applicationLoadingElement);
  }
});
