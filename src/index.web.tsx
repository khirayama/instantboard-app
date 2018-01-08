import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducers from './reducers';
import Navigator from './router/navigator';
import Router from './router/router';
import routes from './router/routes';
import initialState from './store/initial-state';
import Store from './store/store';
import queryString from './utils/query-string';
import tokenManager from './utils/token-manager';
import Tracker from './utils/tracker';

const store: Store = new Store(initialState, reducers);
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

  if (process && process.env.NODE_ENV !== 'production') {
    const query: any = queryString.parse(location.search);

    if (query.metrics && applicationMainElement !== null) {
      applicationMainElement.insertAdjacentHTML(
        'beforeend',
        `
        <div class="layout-metrics">
          <div class="layout-metrics--grid layout-metrics--grid--bar layout-metrics--grid__high__top"></div>
          <div class="layout-metrics--grid layout-metrics--grid--bar layout-metrics--grid__low__top"></div>

          <div class="layout-metrics--grid layout-metrics--grid--bar layout-metrics--grid__high__bottom"></div>
          <div class="layout-metrics--grid layout-metrics--grid--bar layout-metrics--grid__low__bottom"></div>

          <div class="layout-metrics--grid layout-metrics--grid--line layout-metrics--grid__screen-edge__left"></div>
          <div class="layout-metrics--grid layout-metrics--grid--line layout-metrics--grid__screen-edge__right"></div>

          <div class="layout-metrics--grid layout-metrics--grid--line layout-metrics--grid__screen-edge-content__left">
          </div>
          <div class="layout-metrics--grid layout-metrics--grid--line layout-metrics--grid__screen-edge-content__right">
          </div>

          <div class="layout-metrics--grid layout-metrics--grid--content__left"></div>
          <div class="layout-metrics--grid layout-metrics--grid--content__right"></div>

          <div class="layout-metrics--grid layout-metrics--grid--content--edge__left"></div>
          <div class="layout-metrics--grid layout-metrics--grid--content--edge__right"></div>
        </div>
        `,
      );
    }
  }
});
