declare const window: any;

export default class Tracker {
  private router: any;

  constructor(router) {
    this.router = router;
  }

  public send() {
    if (typeof window === 'object' && window.ga) {
      const { route } = this.router.matchRoute(window.location.pathname);
      if (process && process.env.NODE_ENV === 'production') {
        window.ga('send', 'pageview', route.path);
      } else {
        /* eslint-disable capitalized-comments */
        /* tslint:disable:no-console */
        console.log(`%cSend as ${route.path}`, 'color: #9e9e9e;');
        /* tslint:enable:no-console */
        /* eslint-enable capitalized-comments */
      }
    }
  }
}
