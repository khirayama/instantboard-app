import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducers from './reducers';
import Navigator from './router/navigator';
import Router from './router/router';
import routes from './router/routes';
import initialState from './store/initial-state';
import Store from './store/store';
import logger from './utils/logger';

const store: IStore = new Store(initialState, reducers);
const router = new Router(routes);

window.addEventListener('DOMContentLoaded', () => {
  logger.info(`Start app at ${new Date()}.`);

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
