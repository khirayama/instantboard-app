import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class Navigator extends React.Component<INavigatorProps, {path: string}> {
  public static childContextTypes = {
    move: PropTypes.func.isRequired,
  };

  public move: (path: string) => void;

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
      });
    }
  }

  public render() {
    const props = this.props.props;
    const router: IRouter = this.props.router;
    const path_: string = this.state.path;

    let path = path_;
    if (path.indexOf('?') !== -1) {
      path = path.split('?')[0];
    }

    const {route, params} = router.matchRoute(path);
    if (route) {
      return React.createElement(route.component, Object.assign({}, props, {params}));
    }
    return null;
  }

  private _move(path_: string) {
    let path = path_;
    if (path.indexOf('?') !== -1) {
      path = path.split('?')[0];
    }

    const {route} = this.props.router.matchRoute(path);
    window.document.title = route.title;
    window.history.pushState(null, route.title, path_);
    this.setState({path: path_});
  }
}
