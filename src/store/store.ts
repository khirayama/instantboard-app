const EVENT_CHANGE = '__CHANGE_STORE';
const ACTION_DISPATCH = '__ACTION_DISPATCH';
const STORE_SESSION_KEY = '__STORE_SESSION_KEY';

export default class Store<T> {
  private listeners: any = {};

  private state: T;

  private reducer: (state: T, action: any) => any = (state: T) => state;

  private options: {
    debounce: number | null;
    session: boolean;
  };

  private timerId: any;

  constructor(state: T, reducer: any, options: { debounce?: number | null; session?: boolean } = {}) {
    this.options = {
      debounce: options.debounce || null,
      session: options.session || false,
    };

    this.state = state;
    if (state && this.options.session) {
      this.state = JSON.parse(window.sessionStorage.getItem(STORE_SESSION_KEY) || JSON.stringify(state));
    } else if (state && !this.options.session) {
      this.state = state;
    }

    if (reducer) {
      this.reducer = reducer;
    }

    this.subscribe();
  }

  public getState(): any {
    return this.clone(this.state);
  }

  public dispatch(action: any): void {
    this.emit(ACTION_DISPATCH, action);
  }

  public addChangeListener(listener: any): void {
    this.addListener(EVENT_CHANGE, listener);
  }

  public removeChangeListener(listener: any): void {
    this.removeListener(EVENT_CHANGE, listener);
  }

  private clone(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  private emit(type: string, payload: any): Store<T> {
    if (!this.listeners[type]) {
      return this;
    }
    this.listeners[type].forEach((listener: any) => {
      listener.listener.apply(this, [payload]);
    });
    return this;
  }

  private addListener(type: string, listener: any): Store<T> {
    this.listeners[type] = this.listeners[type] || [];
    this.listeners[type].push({ listener });
    return this;
  }

  private removeListener(type: string, removedListener: any): Store<T> {
    if (!this.listeners[type]) {
      return this;
    }
    if (!this.listeners[type].length) {
      return this;
    }
    if (!removedListener) {
      delete this.listeners[type];
      return this;
    }
    this.listeners[type] = this.listeners[type].filter((listener: any) => !(listener.listener === removedListener));
    return this;
  }

  private subscribe(): void {
    this.addListener(ACTION_DISPATCH, (action: any) => {
      const nextState: any = this.reducer(this.clone(this.state), action);

      this.state = nextState;

      if (process && process.env.NODE_ENV !== 'production') {
        console.log('%cAction:', 'color: #76b6c8; font-weight: bold;', action);
        console.log('%cState:', 'color: #2e4551; font-weight: bold;', this.state);
      }

      if (typeof window === 'object' && this.options.session) {
        window.sessionStorage.setItem(STORE_SESSION_KEY, JSON.stringify(this.state));
      }

      this.dispatchChange();
    });
  }

  private dispatchChange(): void {
    if (this.options.debounce) {
      if (this.timerId) {
        return;
      }
      this.emit(EVENT_CHANGE, this);
      this.timerId = setTimeout(() => {
        this.timerId = null;
        this.emit(EVENT_CHANGE, this);
      }, 1000 / 60);
    } else {
      this.emit(EVENT_CHANGE, this);
    }
  }
}
