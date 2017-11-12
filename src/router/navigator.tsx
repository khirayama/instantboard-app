import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class Navigator extends React.Component<INavigatorProps, {path: string}> {
  public static childContextTypes = {
    move: PropTypes.func.isRequired,
  };

  private move: any;

  constructor(props: INavigatorProps) {
    super(props);

    this.state = {
      path: props.path,
    };
    this.move = this._move.bind(this);
  }

  public getChildContext() {
    return {
      move: this.move,
    };
  }

  public componentWillMount() {
    if (typeof window === 'object' && window.history && window.history.pushState) {
      window.addEventListener('popstate', () => {
        const path = window.location.pathname;
        const {route} = this.props.router.matchRoute(path);
        window.document.title = route.title;
        this.setState({path});
        this.props.tracker.send();
      });
    }
  }

  public render() {
    const props = this.props.props;
    const router: IRouter = this.props.router;
    const path: string = this.state.path;

    let pathname = path;
    if (pathname.indexOf('?') !== -1) {
      pathname = pathname.split('?')[0];
    }

    const {route, params} = router.matchRoute(pathname);
    const component = (route.component.toString().indexOf('class') === -1) ? route.component() : route.component;
    if (route) {
      return React.createElement(component, Object.assign({}, props, {params}));
    }
    return null;
  }

  private _move(path: string): void {
    let pathname = path;
    let search = '';
    if (pathname.indexOf('?') !== -1) {
      const tmp = pathname.split('?');
      pathname = tmp[0];
      search = tmp[1];
    }
    if (
      window.location.pathname !== pathname ||
      window.location.search.replace('?', '') !== search
    ) {
      const {route} = this.props.router.matchRoute(pathname);
      window.document.title = route.title;
      window.history.pushState(null, route.title, path);
      this.setState({path});
      this.props.tracker.send();
    }
  }
}
