export const tokenManager = {
  key: '__instantboard_token',
  set: (token: string) => {
    window.localStorage.setItem(tokenManager.key, token);
  },
  get: () => {
    return window.localStorage.getItem(tokenManager.key);
  },
};
