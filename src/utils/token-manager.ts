import * as Cookie from 'js-cookie';

const tokenManager = {
  key: '__instantboard_token',
  set: (token: string) => {
    const now = new Date();
    const expires = new Date(now.setFullYear(now.getFullYear() + 3));

    Cookie.set(tokenManager.key, token, {
      // Cookie spec: http://www.yunabe.jp/docs/cookie_and_security.html
      // No set domain: https://blog.tokumaru.org/2011/10/cookiedomain.html
      // No set secure:
      expires,
    });
    window.localStorage.setItem(tokenManager.key, token);
  },
  get: () => {
    let token = Cookie.get(tokenManager.key);
    if (!token) {
      token = window.localStorage.getItem(tokenManager.key);
      tokenManager.set(token);
    }
    return token;
  },
};
export default tokenManager;
