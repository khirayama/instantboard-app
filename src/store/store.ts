/* tslint:disable:no-console */
const EVENT_CHANGE: string = '__CHANGE_STORE';
const ACTION_DISPATCH: string = '__ACTION_DISPATCH';
const STORE_SESSION_KEY: string = '__STORE_SESSION_KEY';

type TListener<Action> = (action: Action) => void;

export class Store<T, P> {
  private listeners: {
    [key: string]: {
      listener: TListener<P>;
    }[];
  } = {};

  private state: T;

  private reducer: (state: T, action: P) => T;

  private options: {
    debounce: number | null;
    session: boolean;
  };

  private timerId: number | null = null;

  constructor(
    state: T,
    reducer: (state: T, action: P) => T,
    options: { debounce?: number | null; session?: boolean } = {},
  ) {
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

    this.reducer = reducer;

    this.subscribe();
  }

  public getState(): T {
    return this.clone(this.state);
  }

  public dispatch(action: P): void {
    this.emit(ACTION_DISPATCH, action);
  }

  public addChangeListener(listener: TListener<P>): void {
    this.addListener(EVENT_CHANGE, listener);
  }

  public removeChangeListener(listener: TListener<P>): void {
    this.removeListener(EVENT_CHANGE, listener);
  }

  private clone(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  private emit(eventType: string, payload: P | null): Store<T, P> {
    if (!this.listeners[eventType]) {
      return this;
    }
    this.listeners[eventType].forEach((listener: { listener: TListener<P> }) => {
      listener.listener.apply(this, [payload]);
    });

    return this;
  }

  private addListener(eventType: string, listener: TListener<P>): Store<T, P> {
    this.listeners[eventType] = this.listeners[eventType] || [];
    this.listeners[eventType].push({ listener });

    return this;
  }

  private removeListener(eventType: string, removedListener: TListener<P>): Store<T, P> {
    if (!this.listeners[eventType]) {
      return this;
    }
    if (!this.listeners[eventType].length) {
      return this;
    }
    if (!removedListener) {
      delete this.listeners[eventType];

      return this;
    }
    this.listeners[eventType] = this.listeners[eventType].filter(
      (listener: { listener: TListener<P> }) => !(listener.listener === removedListener),
    );

    return this;
  }

  private subscribe(): void {
    this.addListener(ACTION_DISPATCH, (action: P): void => {
      const nextState: T = this.reducer(this.clone(this.state), action);

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
      if (this.timerId === null) {
        return;
      }
      this.emit(EVENT_CHANGE, null);
      this.timerId = setTimeout(() => {
        this.timerId = null;
        this.emit(EVENT_CHANGE, null);
      }, 1000 / 60);
    } else {
      this.emit(EVENT_CHANGE, null);
    }
  }
}
