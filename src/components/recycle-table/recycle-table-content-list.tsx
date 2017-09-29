import * as PropTypes from 'prop-types';
import * as React from 'react';

import {THRESHOLD_DELTAX} from '../constants';

interface IRecycleTableContentList {
  children: any;
}

export class RecycleTableContentList extends React.Component<any, any> {
  private static childContextTypes = {
    handleTouchStart: PropTypes.func,
    handleTouchMove: PropTypes.func,
    handleTouchEnd: PropTypes.func,
  };

  private static contextTypes = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  private recycleTableContentList: any;

  private setRecycleTableContentList: any;

  private touch: any;

  private handleTouchStart: any;

  private handleTouchMove: any;

  private handleTouchEnd: any;

  constructor(props: IRecycleTableContentList) {
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

    this.setRecycleTableContentList = this._setRecycleTableContentList.bind(this);
    this.handleTouchStart = this._handleTouchStart.bind(this);
    this.handleTouchMove = this._handleTouchMove.bind(this);
    this.handleTouchEnd = this._handleTouchEnd.bind(this);
  }

  public getChildContext() {
    return {
      handleTouchStart: this.handleTouchStart,
      handleTouchMove: this.handleTouchMove,
      handleTouchEnd: this.handleTouchEnd,
    };
  }

  public _handleTouchStart(event: any) {
    event.stopPropagation();

    this.touch = Object.assign({}, this.touch, {
      startX: event.touches[0].clientX,
      startY: event.touches[0].clientY,
      startTime: new Date(),
    });
  }

  public _handleTouchMove(event: any) {
    event.stopPropagation();

    this.touch = Object.assign({}, this.touch, {
      endX: event.touches[0].clientX,
      endY: event.touches[0].clientY,
      endTime: new Date(),
      moving: true,
    });

    this._updateTouchMoveView();
  }

  public _handleTouchEnd(event: any) {
    event.stopPropagation();

    const THRESHOLD_WIDTH = window.screen.width / 3;
    const diff = this._calcFilteredDiff();

    this._updateTouchEndView();

    if (THRESHOLD_WIDTH < Math.abs(diff.x)) {
      if (diff.x > 0) {
        this._swipeRightHandler();
      } else {
        this._swipeLeftHandler();
      }
    } else if (THRESHOLD_DELTAX < Math.abs(diff.delta.x)) {
      if (diff.delta.x > 0) {
        this._swipeRightHandler();
      } else {
        this._swipeLeftHandler();
      }
    }

    this.touch = Object.assign({}, this.touch, {
      startX: null,
      startY: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
      moving: false,
    });
  }

  public _calcFilteredDiff() {
    const diff = this._calcDiff();

    if (this.touch.endX !== null && this.touch.endY !== null) {
      if (
        (this.context.currentIndex === 0 && diff.x > 0) ||
        (this.context.currentIndex === this.props.children.length - 1 && diff.x < 0)
      ) {
        diff.x = 0;
        diff.delta.x = 0;
      }
    }

    return diff;
  }

  public _calcDiff() {
    let x = this.touch.endX - this.touch.startX;
    let y = this.touch.endY - this.touch.startY;
    let time = this.touch.endTime.getTime() - this.touch.startTime.getTime();

    time = (time < 0) ? 0 : time;

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

  public _swipeLeftHandler() {
    this.context.setCurrentIndex(this.context.currentIndex + 1);
  }

  public _swipeRightHandler() {
    this.context.setCurrentIndex(this.context.currentIndex - 1);
  }

  public _updateTouchMoveView() {
    const diff = this._calcFilteredDiff();

    if (
      this.touch.moving &&
      diff.x !== 0 &&
      (Math.abs(diff.delta.x) > Math.abs(diff.delta.y)) &&
      (Math.abs(diff.x) > Math.abs(diff.y))
    ) {
      const translateX = this.context.currentIndex * 100 / this.props.children.length;
      this.recycleTableContentList.classList.add('recycle-table-content-list__moving');
      this.recycleTableContentList.style.transform = `translateX(calc(-${translateX}% + ${diff.x}px))`;
      this.recycleTableContentList.style.transitionProperty = 'none';
    }
  }

  public _updateTouchEndView() {
    if (this.recycleTableContentList.classList.contains('recycle-table-content-list__moving')) {
      this.recycleTableContentList.classList.remove('recycle-table-content-list__moving');
    }

    const translateX = this.context.currentIndex * 100 / this.props.children.length;
    this.recycleTableContentList.style.transform = `translateX(calc(-${translateX}%))`;
    this.recycleTableContentList.style.transitionProperty = 'transform';
  }

  public render() {
    const diff = this._calcFilteredDiff();
    const style = {
      width: (this.props.children.length * 100) + '%',
      transform: `translateX(calc(-${this.context.currentIndex * 100 / this.props.children.length}% + ${diff.x}px))`,
    };

    return (
      <section className="recycle-table-content-list">
        <section
          ref={this.setRecycleTableContentList}
          style={style}
          className="recycle-table-content-list--inner"
        >
          {this.props.children}
        </section>
      </section>
    );
  }

  private _setRecycleTableContentList(recycleTableContentList: HTMLElement|null) {
    this.recycleTableContentList = recycleTableContentList;
  }
}
