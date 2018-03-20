import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';

export default class List extends React.Component<any, any> {
  private static childContextTypes = {
    listElement: PropTypes.func,
    onSort: PropTypes.func,
  };

  private listElement: any;

  private setListElement: any;

  private preventDefault: any;

  constructor(props) {
    super(props);

    this.setListElement = this._setListElement.bind(this);

    this.preventDefault = (event: any) => {
      event.preventDefault();
    };
  }

  public componentDidMount() {
    this.listElement.querySelector('.list-content').addEventListener('contextmenu', this.preventDefault);
  }

  public componentWillUnmount() {
    this.listElement.querySelector('.list-content').removeEventListener('contextmenu', this.preventDefault);
  }

  public getChildContext() {
    const { parentElement, onSort } = this.props;
    return {
      listElement: () => {
        if (parentElement) {
          return parentElement;
        }
        return this.listElement;
      },
      onSort,
    };
  }

  public render() {
    const { children, className } = this.props;
    return (
      <section ref={this.setListElement} className={classNames('list', className || '')}>
        <div className="list-content">
          <TransitionGroup component="ul">{children}</TransitionGroup>
        </div>
      </section>
    );
  }

  private _setListElement(listElement: any) {
    this.listElement = listElement;
  }
}
