import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

export class LayeredParentListItem extends React.Component<any, any> {
  private static contextTypes: any = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  private onClick: any;

  constructor(props: any) {
    super(props);

    this.onClick = this.handleClick.bind(this);
  }

  public render(): JSX.Element {
    const { currentIndex } = this.context;
    const { index, children } = this.props;

    return (
      <li
        className={classNames('layered-parent-list-item', {
          'layered-parent-list-item__active': Number(index) === currentIndex,
        })}
        onClick={this.onClick}
      >
        {children}
      </li>
    );
  }

  private handleClick(): void {
    const { setCurrentIndex } = this.context;
    const { onActive, index } = this.props;

    setCurrentIndex(Number(index));
    if (onActive) {
      onActive(Number(index));
    }
  }
}
