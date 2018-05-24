import * as React from 'react';

import { Router } from 'router/Router';
import { Tracker } from 'utils/Tracker';

export const context: any = React.createContext(null);

interface INavigatorProps {
  props?: any;
  router: Router;
  tracker: Tracker;
  path: string;
}

export class Navigator extends React.Component<INavigatorProps, { path: string }> {
  constructor(props: INavigatorProps) {
    super(props);

    this.state = {
      path: props.path,
    };

    if (typeof window === 'object' && window.history && window.history.pushState) {
      window.addEventListener('popstate', () => {
        const { router, tracker } = this.props;
        const path: string = window.location.pathname;
        const result: { route: IRoute; params: { [key: string]: string } } | null = router.matchRoute(path);
        if (result !== null) {
          const route: IRoute = result.route;
          window.document.title = route.title;
          this.setState({ path });
          tracker.send();
        }
      });
    }
  }

  public render(): JSX.Element | null {
    const { props, router } = this.props;
    const { path } = this.state;

    let pathname: string = path;
    if (pathname.indexOf('?') !== -1) {
      pathname = pathname.split('?')[0];
    }

    const result: { route: IRoute; params: { [key: string]: string } } | null = router.matchRoute(pathname);
    if (result !== null) {
      const route: IRoute = result.route;
      const params: { [key: string]: string } = result.params || {};
      const component: string | React.ComponentClass | React.StatelessComponent =
        route.component.toString().indexOf('class') === -1 ? route.component() : route.component;

      const ctx: any = {
        move: this.move.bind(this),
      };

      return <context.Provider value={ctx}>{React.createElement(component, { ...props, params })}</context.Provider>;
    }

    return null;
  }

  private move(path: string): void {
    const { router, tracker } = this.props;
    let pathname: string = path;
    let search: string = '';
    if (pathname.indexOf('?') !== -1) {
      const tmp: string[] = pathname.split('?');
      pathname = tmp[0];
      search = tmp[1];
    }
    if (window.location.pathname !== pathname || window.location.search.replace('?', '') !== search) {
      const result: { route: IRoute; params: { [key: string]: string } } | null = router.matchRoute(pathname);
      if (result !== null) {
        const route: IRoute = result.route;
        window.document.title = route.title;
        window.history.pushState(null, route.title, path);
        this.setState({ path });
        tracker.send();
      }
    }
  }
}
