import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IRecycleTableProps {
  index?: number;
  onChange?: any;
  children: any;
}

export class RecycleTable extends React.Component<IRecycleTableProps, any> {
  private static childContextTypes: {
    currentIndex: any;
    setCurrentIndex: any;
  } = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  private el: any;

  private timerId: any = null;

  private refElement: any;

  constructor(props: any) {
    super(props);

    this.state = {
      currentIndex: props.index || 0,
    };

    this.refElement = this.setElement.bind(this);
  }

  public getChildContext(): any {
    const { currentIndex } = this.state;

    return {
      currentIndex,
      setCurrentIndex: (index: number): void => {
        this.setCurrentIndex(index);
      },
    };
  }

  public componentDidUpdate(): void {
    if (this.timerId === null) {
      const { currentIndex } = this.state;
      this.scrollToCenter(currentIndex, false);
    }
  }

  public scrollToCenter(index: any, animate: boolean): void {
    if (animate) {
      this.timerId = setInterval(() => {
        const el: HTMLElement = this.el;
        if (el === null) {
          return;
        }

        const list: HTMLElement = el.querySelector('.recycle-table-list') as HTMLElement;
        const listItems: NodeListOf<HTMLElement> = list.querySelectorAll('.recycle-table-list-item');
        const listItem: HTMLElement = listItems[index];
        if (listItem) {
          const currentScrollLeft: number = list.scrollLeft;
          const scrollLeft: number = listItem.offsetLeft - (el.clientWidth - listItem.clientWidth) / 2;

          const num: number = 5;
          const speed: number = (scrollLeft - currentScrollLeft) / num;
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
      const el: HTMLElement = this.el;
      if (el === null) {
        return;
      }

      const list: HTMLElement = el.querySelector('.recycle-table-list') as HTMLElement;
      const listItems: NodeListOf<HTMLElement> = list.querySelectorAll('.recycle-table-list-item');
      const listItem: HTMLElement = listItems[index];
      if (listItem) {
        const scrollLeft: number = listItem.offsetLeft - (el.clientWidth - listItem.clientWidth) / 2;

        list.scrollLeft = scrollLeft;
      }
    }
  }

  public setCurrentIndex(index: number): void {
    if (this.timerId === null) {
      const { onChange } = this.props;
      this.setState({ currentIndex: index });
      this.scrollToCenter(index, true);
      if (onChange) {
        onChange(index);
      }
    }
  }

  public render(): any {
    const { children } = this.props;

    return (
      <section ref={this.refElement} className="recycle-table">
        {children}
      </section>
    );
  }

  private setElement(el: any): void {
    this.el = el;
  }
}
