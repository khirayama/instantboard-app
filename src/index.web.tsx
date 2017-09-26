import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducers from './reducers';
import Navigator from './router/navigator';
import Router from './router/router';
import routes from './router/routes';
import initialState from './store/initial-state';
import Store from './store/store';

const store: IStore = new Store(initialState, reducers);
const router = new Router(routes);

window.addEventListener('DOMContentLoaded', () => {
  if (process && process.env.NODE_ENV !== 'production') {
    /* eslint-disable capitalized-comments */
    /* tslint:disable:no-console */
    console.log(`Start app at ${new Date()}.`);
    /* tslint:enable:no-console */
    /* eslint-enable capitalized-comments */
  }

  const applicationMainElement: any = window.document.querySelector('.application--main');
  const path = window.location.pathname;
  ReactDOM.render((
    <Navigator
      props={{store}}
      router={router}
      path={path}
    />
  ), applicationMainElement);

  const applicationLoadingElement: any = window.document.querySelector('.application--loader');
  if (applicationLoadingElement !== null) {
    applicationLoadingElement.parentNode.removeChild(applicationLoadingElement);
  }
});
