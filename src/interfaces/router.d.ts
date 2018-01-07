interface IRouter {
  getPaths: () => string[];
  matchRoute: (
    path: string,
  ) => {
    route: IRoute;
    params: any;
  };
}
