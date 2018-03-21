type poll = {
  timerId: number;
  callback(): void;
};

export const poller: {
  polls: poll[];
  add(callback: () => void, time: number): void;
  remove(callback: () => void): void;
  clear(): void;
} = {
  polls: [],
  add: (callback: () => void, time: number): void => {
    const timerId: number = setInterval(callback, time);
    poller.polls.push({
      timerId,
      callback,
    });
  },
  remove: (callback: () => void): void => {
    for (let i: number = 0; i < poller.polls.length; i += 1) {
      if (poller.polls[i].callback === callback) {
        clearInterval(poller.polls[i].timerId);
        poller.polls.splice(i, 1);
      }
    }
  },
  clear: (): void => {
    for (const callback of poller.polls) {
      clearInterval(callback.timerId);
    }
    poller.polls = [];
  },
};
