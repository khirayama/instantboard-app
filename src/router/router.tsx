const PATH_REGEXP = new RegExp([
  '(\\\\.)',
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))',
].join('|'), 'g');

export function _parse(str: string) {
  const tokens: any[] = [];
  let index: number = 0;
  let path: string = '';
  let res = PATH_REGEXP.exec(str);

  while (res !== null) {
    const offset = res.index;

    path += str.slice(index, offset);
    index = offset + res[0].length;

    // if not exist path or empty string
    if (path) {
      tokens.push(path);
    }
    path = '';

    const token = {
      name: res[3],
      pattern: '[^/]+?',
    };
    tokens.push(token);
    res = PATH_REGEXP.exec(str);
  }

  if (index < str.length) {
    path += str.substr(index);
  }
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

export function _tokensToRegexp(tokens: any) {
  let route = '';
  const lastToken = tokens[tokens.length - 1];
  const endsWithSlash = (typeof lastToken === 'string' && /\/$/.test(lastToken));

  tokens.forEach((token: any) => {
    if (typeof token === 'string') {
      route += token;
    } else {
      let capture = token.pattern;
      capture = '/(' + capture + ')';
      route += capture;
    }
  });
  route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
  route += '$';

  return new RegExp('^' + route, 'i');
}

export function _pathToRegexp(path: string) {
  const tokens = _parse(path);
  const regexp = _tokensToRegexp(tokens);

  const keys: any = [];
  tokens.forEach((token) => {
    if (typeof token !== 'string') {
      keys.push(token);
    }
  });

  return {
    regexp,
    keys,
  };
}

export function _getParams(keys: any, matches: any) {
  const params: any = {};

  if (matches) {
    keys.forEach((key: any, index: number) => {
      params[key.name] = matches[index + 1];
    });
  }
  return params;
}

export function _exec(regexp: RegExp, keys: string[], path: string): any {
  const matches: any = regexp.exec(path);
  const params = _getParams(keys, matches);

  return {
    matches,
    params,
  };
}

export default class Router {
  private routes: IRoute[];

  constructor(routes) {
    this.routes = routes;
  }

  public getPaths() {
    return this.routes.map((route: IRoute) => route.path);
  }

  public matchRoute(path: string) {
    for (let i = 0; i < this.routes.length; i++) {
      const route = this.routes[i];
      const {regexp, keys} = _pathToRegexp(route.path || '');
      const {matches, params} = _exec(regexp, keys, path);
      if (matches) {
        return {route, params};
      }
    }
    return null;
  }
}
