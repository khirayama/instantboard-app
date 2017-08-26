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
    return new Promise((resolve: any) => {
      resolve(this.data);
    });
  }

  public create(label: any) {
    return new Promise((resolve) => {
      const newLabel: any = this.build(label);
      this.data.push(newLabel);
      this.save();
      resolve(newLabel);
    });
  }

  public update(label: any) {
    return new Promise((resolve) => {
      const newLabel: any = this.build(label);
      this.data = this.data.map((_label: any) => {
        if (_label.cid === newLabel.cid) {
          return newLabel;
        }
        return _label;
      });
      this.save();
      resolve(newLabel);
    });
  }

  public destroy(label: any) {
    return new Promise((resolve) => {
      this.data = this.data.filter((_label: any) => {
        if (_label.cid === label.cid) {
          return false;
        }
        return true;
      });
      this.save();
      resolve(label);
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
