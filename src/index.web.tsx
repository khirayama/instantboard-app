import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducers from './reducers';
import mobileRoutes from './router/mobile-routes';
import desktopRoutes from './router/desktop-routes';
import Navigator from './router/navigator';
import Router from './router/router';
import initialState from './store/initial-state';
import Store from './store/store';
import queryString from './utils/query-string';
import tokenManager from './utils/token-manager';
import Tracker from './utils/tracker';

// Check ui.type
const uiType = (
  window.ontouchstart !== undefined &&
  window.innerWidth < window.innerHeight
) ? 'mobile' : 'desktop';

const store: IStore = new Store(initialState, reducers);
const routes = (uiType === 'mobile') ? mobileRoutes : desktopRoutes;
const router = new Router(routes);
const tracker = new Tracker(router);

tracker.send();

// Redirect
if (window.location.pathname !== '/login') {
  const token = tokenManager.get();
  if (!token) {
    window.location.href = '/login';
  }
}

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
    <div className={uiType}>
      <Navigator
        props={{store}}
        router={router}
        tracker={tracker}
        path={path}
      />
    </div>
  ), applicationMainElement);

  const applicationLoadingElement: any = window.document.querySelector('.application--loader');
  if (applicationLoadingElement !== null) {
    applicationLoadingElement.parentNode.removeChild(applicationLoadingElement);
  }

  if (process && process.env.NODE_ENV !== 'production') {
    const query = queryString.parse(location.search);
    if (query.metrics) {
      applicationMainElement.insertAdjacentHTML(
        'beforeend',
        `
        <div class="layout-metrics">
          <div class="layout-metrics--grid layout-metrics--bar-low__top"></div>
          <div class="layout-metrics--grid layout-metrics--bar-high__top"></div>
          <div class="layout-metrics--grid layout-metrics--bar-low__bottom"></div>
          <div class="layout-metrics--grid layout-metrics--bar-high__bottom"></div>
          <div class="layout-metrics--grid layout-metrics--screen-edge__left"></div>
          <div class="layout-metrics--grid layout-metrics--screen-edge__right"></div>
          <div class="layout-metrics--grid layout-metrics--screen-edge--content__left"></div>
          <div class="layout-metrics--grid layout-metrics--screen-edge--content__left--edge__left"></div>
          <div class="layout-metrics--grid layout-metrics--screen-edge--content__left--edge__right"></div>
          <div class="layout-metrics--grid layout-metrics--screen-edge--content__right"></div>
          <div class="layout-metrics--grid layout-metrics--screen-edge--content__right--edge__left"></div>
          <div class="layout-metrics--grid layout-metrics--screen-edge--content__right--edge__right"></div>
        </div>
        `,
      );
    }
  }
});
