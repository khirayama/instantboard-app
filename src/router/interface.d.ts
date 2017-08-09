interface IRoute {
  path: string;
  title: string;
  component: any;
}

interface IRouter {
  getPaths: () => string[];
  matchRoute: (string) => {
    route: IRoute;
    params: any;
  };
}

interface INavigatorProps {
  props?: any;
  router: any;
  path: string;
}

interface ILinkProps {
  to: string;
  className?: string;
}
