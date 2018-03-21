/* tslint:disable:no-console */
import { Router } from 'router/Router';

declare const window: any;

export class Tracker {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public send(): void {
    if (typeof window === 'object' && window.ga) {
      const result: {
        route: IRoute;
        params: { [key: string]: string };
      } | null = this.router.matchRoute(window.location.pathname);

      if (result !== null) {
        const route: IRoute = result.route;

        if (process && process.env.NODE_ENV === 'production') {
          window.ga('send', 'pageview', route.path);
        } else {
          console.log(`%cSend as ${route.path}`, 'color: #9e9e9e;');
        }
      }
    }
  }
}
