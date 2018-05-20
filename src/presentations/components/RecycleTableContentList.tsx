import * as PropTypes from 'prop-types';
import * as React from 'react';

import { THRESHOLD_DELTAX } from 'presentations/constants';

interface IDiff {
  x: number;
  y: number;
  time: number;
  delta: {
    x: number;
    y: number;
  };
}

export class RecycleTableContentList extends React.Component<any, any> {
  private static childContextTypes: any = {
    handleTouchStart: PropTypes.func,
    handleTouchMove: PropTypes.func,
    handleTouchEnd: PropTypes.func,
  };

  private static contextTypes: any = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  private ref: any;

  private touch: any;

  private onTouchStart: any;

  private onTouchMove: any;

  private onTouchEnd: any;

  constructor(props: any) {
    super(props);

    this.touch = {
      startX: null,
      startY: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
      moving: false,
    };

    this.onTouchStart = this.handleTouchStart.bind(this);
    this.onTouchMove = this.handleTouchMove.bind(this);
    this.onTouchEnd = this.handleTouchEnd.bind(this);
  }

  public getChildContext(): any {
    return {
      handleTouchStart: this.onTouchStart,
      handleTouchMove: this.onTouchMove,
      handleTouchEnd: this.onTouchEnd,
    };
  }

  public handleTouchStart(event: React.TouchEvent<HTMLElement>): void {
    event.stopPropagation();

    this.touch = {
      ...this.touch,
      startX: event.touches[0].clientX,
      startY: event.touches[0].clientY,
      startTime: new Date(),
    };
  }

  public handleTouchMove(event: React.TouchEvent<HTMLElement>): void {
    event.stopPropagation();

    this.touch = {
      ...this.touch,
      endX: event.touches[0].clientX,
      endY: event.touches[0].clientY,
      endTime: new Date(),
      moving: true,
    };

    this.updateTouchMoveView();
  }

  public handleTouchEnd(event: React.TouchEvent<HTMLElement>): void {
    event.stopPropagation();

    const THRESHOLD_WIDTH: number = window.screen.width / 3;
    const diff: IDiff = this.calcFilteredDiff();

    this.updateTouchEndView();

    if (THRESHOLD_WIDTH < Math.abs(diff.x)) {
      if (diff.x > 0) {
        this.swipeRightHandler();
      } else {
        this.swipeLeftHandler();
      }
    } else if (THRESHOLD_DELTAX < Math.abs(diff.delta.x)) {
      if (diff.delta.x > 0) {
        this.swipeRightHandler();
      } else {
        this.swipeLeftHandler();
      }
    }

    this.touch = {
      ...this.touch,
      startX: null,
      startY: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
      moving: false,
    };
  }

  public calcFilteredDiff(): IDiff {
    const { currentIndex }: { currentIndex: number } = this.context;
    const { children }: { children?: any } = this.props;
    const diff: IDiff = this.calcDiff();

    if (this.touch.endX !== null && this.touch.endY !== null) {
      if ((currentIndex === 0 && diff.x > 0) || (currentIndex === children.length - 1 && diff.x < 0)) {
        diff.x = 0;
        diff.delta.x = 0;
      }
    }

    return diff;
  }

  public calcDiff(): IDiff {
    let x: number = this.touch.endX - this.touch.startX;
    let y: number = this.touch.endY - this.touch.startY;
    let time: number = this.touch.endTime.getTime() - this.touch.startTime.getTime();

    time = time < 0 ? 0 : time;

    if (this.touch.endX === null || this.touch.endY === null) {
      x = 0;
      y = 0;
    }

    return {
      x,
      y,
      time,
      delta: {
        x: Number((x / time).toFixed(2)),
        y: Number((y / time).toFixed(2)),
      },
    };
  }

  public swipeLeftHandler(): void {
    const { setCurrentIndex, currentIndex } = this.context;
    setCurrentIndex(currentIndex + 1);
  }

  public swipeRightHandler(): void {
    const { setCurrentIndex, currentIndex } = this.context;
    setCurrentIndex(currentIndex - 1);
  }

  public updateTouchMoveView(): void {
    const { currentIndex }: { currentIndex: number } = this.context;
    const { children }: { children?: any } = this.props;
    const diff: IDiff = this.calcFilteredDiff();
    const el: HTMLElement = this.ref.current;

    if (
      this.touch.moving &&
      diff.x !== 0 &&
      Math.abs(diff.delta.x) > Math.abs(diff.delta.y) &&
      Math.abs(diff.x) > Math.abs(diff.y)
    ) {
      const translateX: number = currentIndex * 100 / children.length;
      el.classList.add('recycle-table-content-list__moving');
      el.style.transform = `translateX(calc(-${translateX}% + ${diff.x}px))`;
      el.style.transitionProperty = 'none';
    }
  }

  public updateTouchEndView(): void {
    const { currentIndex }: { currentIndex: number } = this.context;
    const { children }: { children?: any } = this.props;
    const el: HTMLElement = this.ref.current;

    if (el.classList.contains('recycle-table-content-list__moving')) {
      el.classList.remove('recycle-table-content-list__moving');
    }

    const translateX: number = currentIndex * 100 / children.length;
    el.style.transform = `translateX(calc(-${translateX}%))`;
    el.style.transitionProperty = 'transform';
  }

  public render(): any {
    const { currentIndex }: { currentIndex: number } = this.context;
    const { children }: { children?: any } = this.props;
    const style: {
      width: string;
      transform: string;
    } = {
      width: `${children.length * 100}%`,
      transform: `translateX(-${currentIndex * 100 / children.length}%)`,
    };

    this.ref = React.createRef();

    return (
      <section className="recycle-table-content-list">
        <section ref={this.ref} style={style} className="recycle-table-content-list--inner">
          {children}
        </section>
      </section>
    );
  }
}
