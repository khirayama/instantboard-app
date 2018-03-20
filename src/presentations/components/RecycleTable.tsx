import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IRecycleTableProps {
  index?: number;
  onChange?: any;
  children: any;
}

export default class RecycleTable extends React.Component<IRecycleTableProps, any> {
  private static childContextTypes = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func
  };

  private el: any;

  private timerId: any = null;

  private setElement: any;

  private setCurrentIndex: any;

  constructor(props: any) {
    super(props);

    this.state = {
      currentIndex: props.index || 0
    };

    this.setElement = this._setElement.bind(this);
    this.setCurrentIndex = this._setCurrentIndex.bind(this);
  }

  public getChildContext() {
    const { currentIndex } = this.state;
    return {
      currentIndex,
      setCurrentIndex: this.setCurrentIndex
    };
  }

  public componentDidUpdate() {
    if (this.timerId === null) {
      const { currentIndex } = this.state;
      this._scrollToCenter(currentIndex, false);
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
          const scrollLeft = listItem.offsetLeft - (el.clientWidth - listItem.clientWidth) / 2;

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
      },                         1000 / 60);
    } else {
      const el = this.el;
      if (el === null) {
        return;
      }

      const list = el.querySelector('.recycle-table-list');
      const listItems = list.querySelectorAll('.recycle-table-list-item');
      const listItem = listItems[index];
      if (listItem) {
        const scrollLeft = listItem.offsetLeft - (el.clientWidth - listItem.clientWidth) / 2;

        list.scrollLeft = scrollLeft;
      }
    }
  }

  public _setCurrentIndex(index: number) {
    if (this.timerId === null) {
      const { onChange } = this.props;
      this.setState({ currentIndex: index });
      this._scrollToCenter(index, true);
      if (onChange) {
        onChange(index);
      }
    }
  }

  public render() {
    const { children } = this.props;
    return (
      <section ref={this.setElement} className='recycle-table'>
        {children}
      </section>
    );
  }

  private _setElement(el: any) {
    this.el = el;
  }
}
