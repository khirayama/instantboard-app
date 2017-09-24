
const poller: {
  callbacks: any[];
  add: any;
  remove: any;
  clear: any;
  } = {
    callbacks: [],
    add: (callback: any, time: number) => {
      const timerId = setInterval(callback, time);
      poller.callbacks.push({
        id: timerId,
        callback,
      });
    },
    remove: (callback: any) => {
      for (let i = 0; i < poller.callbacks.length; i++) {
        if (poller.callbacks[i].callback === callback) {
          clearInterval(poller.callbacks[i].id);
          poller.callbacks.splice(i, 1);
        }
      }
    },
    clear: () => {
      poller.callbacks = [];
    },
  };
export default poller;
