const poller: {
  callbacks: any[];
  add: any;
  remove: any;
  clear: any;
} = {
  callbacks: [],
  add: (callback: any, time: number): void => {
    const timerId = setInterval(callback, time);
    poller.callbacks.push({
      id: timerId,
      callback,
    });
  },
  remove: (callback: any): void => {
    for (let i = 0; i < poller.callbacks.length; i++) {
      if (poller.callbacks[i].callback === callback) {
        clearInterval(poller.callbacks[i].id);
        poller.callbacks.splice(i, 1);
      }
    }
  },
  clear: (): void => {
    for (const callback of poller.callbacks) {
      clearInterval(callback.id);
    }
    poller.callbacks = [];
  },
};
export default poller;
