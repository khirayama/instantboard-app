import * as React from 'react';

export default class Indicator extends React.Component<any, any> {
  private el: any = null;

  private setElement: any;

  constructor(props: any) {
    super(props);

    this.state = {
      show: false,
    };

    this.setElement = this._setElement.bind(this);
  }

  public componentDidMount() {
    this.toggleClassName();
  }

  public componentDidUpdate() {
    this.toggleClassName();
  }

  public render() {
    const active = this.props.active;

    return (
      <div
        key="indicator"
        className="indicator"
        ref={this.setElement}
      >
        <svg>
          <defs>
            <linearGradient id="indicator-gradient">
              <stop className="indicator-color1" offset="0%"/>
              <stop className="indicator-color2" offset="33.4%"/>
              <stop className="indicator-color3" offset="100%"/>
            </linearGradient>
          </defs>
          <rect id="indicator" x="0" y="0" width="100%" height="100%" fill="none"/>
        </svg>
      </div>
    );
  }

  private _setElement(el) {
    this.el = el;
  }

  private toggleClassName() {
    setTimeout(() => {
      if (this.props.active) {
        this.el.classList.add('indicator__active');
      } else {
        this.el.classList.remove('indicator__active');
      }
    }, 0);
  }
}
