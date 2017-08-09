import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Store from './store/store';
import initialState from './store/initial-state';
import reducers from './reducers';
import Navigator from './router/navigator';
import Router from './router/router';
import routes from './router/routes';

const store: IStore = new Store(initialState, reducers);

window.addEventListener('DOMContentLoaded', () => {
  console.log(`Start app at ${new Date()}.`);

  const applicationMainElement: any = window.document.querySelector('.application--main');
  const path = window.location.pathname;
  const router = new Router(routes);
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
