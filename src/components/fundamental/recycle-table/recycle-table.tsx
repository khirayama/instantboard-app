import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IRecycleTableProps {
  index?: number;
  children: any;
}

export class RecycleTable extends React.Component<IRecycleTableProps, any> {
  private static childContextTypes = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  private el: any;

  private timerId: any = null;

  private setElement: any;

  constructor(props: any) {
    super(props);

    this.state = {
      currentIndex: props.index || 0,
    };

    this.setElement = this._setElement.bind(this);
  }

  public getChildContext() {
    return {
      currentIndex: this.state.currentIndex,
      setCurrentIndex: this._setCurrentIndex.bind(this),
    };
  }

  public componentDidUpdate() {
    if (this.timerId === null) {
      this._scrollToCenter(this.state.currentIndex, false);
    }
  }

  public _scrollToCenter(index: any, animate: boolean) {
    if (animate) {
      this.timerId = setInterval(() => {
        const el = this.el;
        if (el === null) {
          return;
        }

        const list = el.querySelector('.recycle-table-list');
        const listItems = list.querySelectorAll('.recycle-table-list-item');
        const listItem = listItems[index];
        if (listItem) {
          const currentScrollLeft = list.scrollLeft;
          const scrollLeft = listItem.offsetLeft - ((el.clientWidth - listItem.clientWidth) / 2);

          const num = 5;
          const speed = (scrollLeft - currentScrollLeft) / num;
          if (speed < 0) {
            list.scrollLeft += Math.min(speed, -1);
          } else {
            list.scrollLeft += Math.max(speed, 1);
          }
          if (Math.abs(list.scrollLeft - scrollLeft) < 1) {
            list.scrollLeft = scrollLeft;
            clearInterval(this.timerId);
            this.timerId = null;
          }
        }
      }, 1000 / 60);
    } else {
      const el = this.el;
      if (el === null) {
        return;
      }

      const list = el.querySelector('.recycle-table-list');
      const listItems = list.querySelectorAll('.recycle-table-list-item');
      const listItem = listItems[index];
      if (listItem) {
        const scrollLeft = listItem.offsetLeft - ((el.clientWidth - listItem.clientWidth) / 2);

        list.scrollLeft = scrollLeft;
      }
    }
  }

  public _setCurrentIndex(index: number) {
    if (this.timerId === null) {
      this.setState({currentIndex: index});
      this._scrollToCenter(index, true);
    }
  }

  public render() {
    return (
      <section
        ref={this.setElement}
        className="recycle-table"
      >
        {this.props.children}
      </section>
    );
  }

  private _setElement(el: any) {
    this.el = el;
  }
}
