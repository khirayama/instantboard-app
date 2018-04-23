import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';

export class List extends React.Component<any, any> {
  private static childContextTypes: any = {
    listElement: PropTypes.func,
    onSort: PropTypes.func,
  };

  private listElement: any;

  private refListElement: any;

  private preventDefault: any;

  constructor(props: any) {
    super(props);

    this.refListElement = this.setListElement.bind(this);

    this.preventDefault = (event: any): void => {
      event.preventDefault();
    };
  }

  public componentDidMount(): void {
    this.listElement.querySelector('.list-content').addEventListener('contextmenu', this.preventDefault);
  }

  public componentWillUnmount(): void {
    this.listElement.querySelector('.list-content').removeEventListener('contextmenu', this.preventDefault);
  }

  public getChildContext(): any {
    const { parentElement, onSort } = this.props;

    return {
      listElement: (): HTMLElement => {
        if (parentElement) {
          return parentElement;
        }

        return this.listElement;
      },
      onSort,
    };
  }

  public render(): JSX.Element {
    const { children, className } = this.props;

    return (
      <section ref={this.refListElement} className={classNames('list', className || '')}>
        <div className="list-content">
          <TransitionGroup component="ul">{children}</TransitionGroup>
        </div>
      </section>
    );
  }

  private setListElement(listElement: HTMLElement): void {
    this.listElement = listElement;
  }
}
