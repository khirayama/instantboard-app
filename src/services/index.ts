import * as uuid from 'uuid/v4';

class LabelService {
  private data: any[] = [];

  private key: string = '__instantboard_labels';

  constructor() {
    this.data = this.load();
  }

  public cache() {
    return this.data;
  }

  public build(label: any) {
    let label_ = {};
    for (let i = 0; i < this.data.length; i++) {
      const data = this.data[i];
      if (data.cid === label.cid) {
        label_ = data;
        break;
      }
    }

    const newLabel: any = Object.assign({
      cid: uuid(),
      name: '',
      visibled: true,
      priority: this.data.length,
    }, label_, label);

    return newLabel;
  }

  public fetch() {
    const labels = this.sortByPriority(this.data);

    return {
      data: {labels},
      sync: () => {
        return new Promise((resolve, reject) => {
          try {
            this.save();
          } catch (error) {
            reject(error);
            return;
          }
          resolve(labels);
        });
      },
    };
  }

  public create(label: any) {
    const newLabel: any = this.build(label);
    this.data.push(newLabel);

    return {
      data: {label: newLabel},
      sync: () => {
        return new Promise((resolve, reject) => {
          try {
            this.save();
          } catch (error) {
            reject(error);
            return;
          }
          resolve(newLabel);
        });
      },
    };
  }

  public update(label: any) {
    const newLabel: any = this.build(label);
    this.data = this.data.map((_label: any) => {
      if (_label.cid === newLabel.cid) {
        return newLabel;
      }
      return _label;
    });

    return {
      data: {label: newLabel},
      sync: () => {
        return new Promise((resolve, reject) => {
          try {
            this.save();
          } catch (error) {
            reject(error);
            return;
          }
          resolve(newLabel);
        });
      },
    };
  }

  public destroy(label: any) {
    const labels = this.sortByPriority(this.data);

    this.data = labels.filter((_label: any) => {
      if (_label.cid === label.cid) {
        return false;
      }
      if (_label.priority > label.priority) {
        _label.priority -= 1;
      }
      return true;
    });

    return {
      data: {labels: this.sortByPriority(this.data)},
      sync: () => {
        return new Promise((resolve, reject) => {
          try {
            this.save();
          } catch (error) {
            reject(error);
            return;
          }
          resolve(labels);
        });
      },
    };
  }

  public sort(label, priority) {
    const labels = this.sortByPriority(this.data);

    if (label.priority > priority) {
      this.data = labels.map(label_ => {
        if (label_.priority === label.priority) {
          label_.priority = priority;
        } else if (
          (priority <= label_.priority) &&
          (label_.priority < label.priority)
        ) {
          label_.priority += 1;
        }
        return label_;
      });
    } else if (label.priority < priority) {
      this.data = labels.map(label_ => {
        if (label_.priority === label.priority) {
          label_.priority = priority;
        } else if (
          (label.priority < label_.priority) &&
          (label_.priority <= priority)
        ) {
          label_.priority -= 1;
        }
        return label_;
      });
    }

    return {
      data: {
        labels: this.sortByPriority(labels),
      },
      sync: () => {
        return new Promise((resolve, reject) => {
          try {
            this.save();
          } catch (error) {
            reject(error);
            return;
          }
          resolve(labels);
        });
      },
    };
  }

  private sortByPriority(labels) {
    return labels.sort((x, y) => {
      if (x.priority > y.priority) {
        return 1;
      } else if (x.priority < y.priority) {
        return -1;
      }
      return 0;
    });
  }

  private isBrowser() {
    return (typeof window === 'object');
  }

  private load() {
    if (this.isBrowser()) {
      const dataString: any = window.localStorage.getItem(this.key);
      const data: any = (dataString) ? JSON.parse(dataString) : [];
      return data;
    }
    return [];
  }

  private save() {
    if (this.isBrowser()) {
      window.localStorage.setItem(this.key, JSON.stringify(this.data));
    }
  }
}

const Label = new LabelService();

export {
  Label,
};
