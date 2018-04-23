import * as React from 'react';

export class Indicator extends React.Component<any, any> {
  private el: any = null;

  private refElement: any;

  constructor(props: any) {
    super(props);

    this.refElement = this.setElement.bind(this);
  }

  public componentDidMount(): void {
    this.toggleClassName();
  }

  public componentDidUpdate(): void {
    this.toggleClassName();
  }

  public render(): JSX.Element {
    return (
      <div key="indicator" ref={this.refElement} className="indicator">
        <svg>
          <defs>
            <linearGradient id="indicator-gradient">
              <stop className="indicator-color1" offset="0%" />
              <stop className="indicator-color2" offset="33.4%" />
              <stop className="indicator-color3" offset="100%" />
            </linearGradient>
          </defs>
          <rect id="indicator" x="0" y="0" width="100%" height="100%" fill="none" />
        </svg>
      </div>
    );
  }

  private setElement(el: HTMLElement): void {
    this.el = el;
  }

  private toggleClassName(): void {
    setTimeout(() => {
      const { active } = this.props;
      if (this.el) {
        if (active) {
          this.el.classList.add('indicator__active');
        } else {
          this.el.classList.remove('indicator__active');
        }
      }
    }, 0);
  }
}
