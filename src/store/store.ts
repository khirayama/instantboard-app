const EVENT_CHANGE = '__CHANGE_STORE';
const ACTION_DISPATCH = '__ACTION_DISPATCH';

export default class Store {
  private listeners: any = {};
  private state: any = {};
  private reducer: (state: any, action: any) => any = ((state: any) => state);
  private shouldChangeDispatch: (currentState: any, nextState: any) => boolean = (() => true);

  constructor(state: any, reducer: any, options: any = {}) {
    if (state) {
      this.state = state;
    }

    if (reducer) {
      this.reducer = reducer;
    }

    if (options.shouldChangeDispatch) {
      this.shouldChangeDispatch = options.shouldChangeDispatch;
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

  private emit(type: string, payload: any): Store {
    if (!this.listeners[type]) {
      return this;
    }
    this.listeners[type].forEach((listener: any) => {
      listener.listener.apply(this, [payload]);
    });
    return this;
  }

  private addListener(type: string, listener: any): Store {
    this.listeners[type] = this.listeners[type] || [];
    this.listeners[type].push({listener});
    return this;
  }

  private removeListener(type: string, removedListener: any): Store {
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
      const currentState = this.clone(this.state);
      const nextState: any = this.reducer(this.clone(this.state), action);

      this.state = nextState;

      /* eslint-disable capitalized-comments */
      /* tslint:disable:no-console */
      console.log('%cAction:', 'color: #76b6c8; font-weight: bold;', action);
      console.log('%cState:', 'color: #2e4551; font-weight: bold;', this.state);
      /* tslint:enable:no-console */
      /* eslint-enable capitalized-comments */

      if (this.shouldChangeDispatch(currentState, nextState)) {
        this.dispatchChange();
      }
    });
  }

  private dispatchChange(): void {
    this.emit(EVENT_CHANGE, this);
  }
}
