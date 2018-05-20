import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';

export class List extends React.Component<any, any> {
  private static childContextTypes: any = {
    listElement: PropTypes.func,
    onSort: PropTypes.func,
  };

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

  public getChildContext(): any {
    const { parentElement, onSort } = this.props;

    return {
      listElement: (): HTMLElement => {
        if (parentElement) {
          return parentElement;
        }

        return this.ref.current;
      },
      onSort,
    };
  }

  public render(): JSX.Element {
    const { children, className } = this.props;
    this.ref = React.createRef();

    return (
      <section ref={this.ref} className={classNames('list', className || '')}>
        <div className="list-content">
          <TransitionGroup component="ul">{children}</TransitionGroup>
        </div>
      </section>
    );
  }
}
