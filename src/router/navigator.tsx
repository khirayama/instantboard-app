import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class Navigator extends React.Component<INavigatorProps, {path: string}> {
  public static childContextTypes = {
    move: PropTypes.func.isRequired,
  };

  constructor(props: INavigatorProps) {
    super(props);

    this.state = {
      path: props.path,
    };
  }

  public getChildContext() {
    return {
      move: this.move.bind(this),
    };
  }

  public componentWillMount() {
    if (typeof window === 'object' && window.history && window.history.pushState) {
      window.addEventListener('popstate', () => {
        const path = window.location.pathname;
        const {route} = this.props.router.matchRoute(path);
        window.document.title = route.title;
        this.setState({path});
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
    if (route) {
      return React.createElement(route.component, Object.assign({}, props, {params}));
    }
    return null;
  }

  private move(path: string): void {
    let pathname = path;
    if (pathname.indexOf('?') !== -1) {
      pathname = pathname.split('?')[0];
    }

    const {route} = this.props.router.matchRoute(pathname);
    window.document.title = route.title;
    window.history.pushState(null, route.title, path);
    this.setState({path});
  }
}
