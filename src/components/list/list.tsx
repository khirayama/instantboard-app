import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';

export class List extends React.Component<any, any> {
  private static childContextTypes = {
    listElement: PropTypes.func,
    onSort: PropTypes.func,
  };

  private listElement: any;

  private setListElement: any;

  constructor(props) {
    super(props);

    this.setListElement = this._setListElement.bind(this);
  }

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

  public render() {
    return (
      <section
        ref={this.setListElement}
        className={classNames('list', this.props.className || '')}
      >
        <div className="list-content">
          <TransitionGroup component="ul">
            {this.props.children}
          </TransitionGroup>
        </div>
      </section>
    );
  }

  private _setListElement(listElement: any) {
    this.listElement = listElement;
  }
}