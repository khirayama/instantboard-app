import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

export default class LayeredParentListItem extends React.Component<any, any> {
  private static contextTypes = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  private handleClick: any;

  constructor(props: any) {
    super(props);

    this.handleClick = this._handleClick.bind(this);
  }

  public render() {
    const {currentIndex} = this.context;
    const {index, children} = this.props;

    return (
      <li
        className={classNames(
          'layered-parent-list-item',
          {'layered-parent-list-item__active': (Number(index) === currentIndex)},
        )}
        onClick={this.handleClick}>
        {children}
      </li>
    );
  }

  private _handleClick() {
    const {setCurrentIndex} = this.context;
    const {onActive, index} = this.props;

    setCurrentIndex(Number(index));
    if (onActive) {
      onActive(Number(index));
    }
  }
}
