import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactTransitionGroup from 'react-addons-transition-group';

export class List extends React.Component<any, any> {
  private static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onSort: PropTypes.func,
  };

  private static childContextTypes = {
    listElement: PropTypes.func,
    onSort: PropTypes.func,
  };

  private listElement: any;

  public componentDidMount() {
    this.listElement.querySelector('.list-content').addEventListener('contextmenu', (event: any) => {
      event.preventDefault();
    });
  }
  public getChildContext() {
    return {
      listElement: () => this.listElement,
      onSort: this.props.onSort,
    };
  }
  public _setListElement(listElement: any) {
    this.listElement = listElement;
  }
  public render() {
    return (
      <section
        className={classNames('list', this.props.className)}
        ref={(el: any) => this._setListElement(el)}
        >
        <div className="list-content">
          <ReactTransitionGroup>{this.props.children}</ReactTransitionGroup>
        </div>
      </section>
    );
  }
}
