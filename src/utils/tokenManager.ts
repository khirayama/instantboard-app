const KEY: string = '__instantboard_token';

export const tokenManager: {
  set(token: string): void;
  get(): string | null;
} = {
  set: (token: string): void => {
    window.localStorage.setItem(KEY, token);
  },
  get: (): string | null => {
    return window.localStorage.getItem(KEY);
  },
};
