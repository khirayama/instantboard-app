import * as classNames from 'classnames';
import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';

export const context: any = React.createContext(null);

export class List extends React.Component<any, any> {
  private ref: any;

  private preventDefault: any;

  constructor(props: any) {
    super(props);

    this.preventDefault = (event: any): void => {
      event.preventDefault();
    };
  }

  public componentDidMount(): void {
    const el: HTMLElement = this.ref.current;
    const targetElement: HTMLElement = el.querySelector('.list-content') as HTMLElement;
    targetElement.addEventListener('contextmenu', this.preventDefault);
  }

  public componentWillUnmount(): void {
    const el: HTMLElement = this.ref.current;
    const targetElement: HTMLElement = el.querySelector('.list-content') as HTMLElement;
    targetElement.removeEventListener('contextmenu', this.preventDefault);
  }

  public render(): JSX.Element {
    const { children, className, parentElement, onSort } = this.props;
    this.ref = React.createRef();

    const ctx: any = {
      listElement: (): HTMLElement => {
        if (parentElement) {
          return parentElement;
        }

        return this.ref.current;
      },
      onSort,
    };

    return (
      <context.Provider value={ctx}>
        <section ref={this.ref} className={classNames('list', className || '')}>
          <div className="list-content">
            <TransitionGroup component="ul">{children}</TransitionGroup>
          </div>
        </section>
      </context.Provider>
    );
  }
}
