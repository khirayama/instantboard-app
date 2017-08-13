import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  THRESHOLD_HOLD_TIME,
  THRESHOLD_SCROLL_HEIGHT,
  TRANSITION_TIME,
  transitionProperties,
} from '../constants';

export class ListItem extends React.Component<any, any> {
  private static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onTouchHold: PropTypes.func,
  };

  private static contextTypes = {
    listElement: PropTypes.func,
    onSort: PropTypes.func,
  };

  private listItem: any;
  private pointer: any;
  private timerId: any;
  private touch: any;
  private mouse: any;

  constructor() {
    super();

    this.pointer = {
      startX: null,
      startY: null,
      startScrollTop: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
    };

    // desktop
    this.mouse = {
      down: false,
      clickable: true,
    };

    // mobile
    this.touch = {
      timerId: null,
      holding: false,
    };
  }
  public componentWillEnter(done: any) {
    const el = this.listItem;
    const height = el.offsetHeight;

    el.style.maxHeight = '0px';

    el.style.transitionProperty = transitionProperties.MAX_HEIGHT;
    setTimeout(() => {
      el.style.maxHeight = height + 'px';
    }, 0);
    setTimeout(() => {
      el.style.maxHeight = '';
      el.style.transitionProperty = '';
      done();
    }, TRANSITION_TIME);
  }
  public componentWillLeave(done: any) {
    const el = this.listItem;
    const height = el.offsetHeight;

    el.style.height = height + 'px';

    el.style.transitionProperty = transitionProperties.HEIGHT;
    setTimeout(() => {
      el.style.height = '0px';
    }, 0);

    setTimeout(() => {
      done();
    }, TRANSITION_TIME);
  }
  public componentDidMount() {
    // can't prevent event passive in Chrome.
    // because not use onTouchMove
    this.listItem.addEventListener('touchmove', this._handleTouchMove.bind(this));
  }

  // handling event
  public _handleClick(event: any) {
    if (this.mouse.clickable && this.props.onClick) {
      this.props.onClick(event);
    }
  }
  public _handleMouseDown(event: any) {
    this.mouse.down = true;
    this.pointer = Object.assign({}, this.pointer, {
      startX: event.clientX,
      startY: event.clientY,
      startScrollTop: this.context.listElement().scrollTop,
      startTime: new Date(),
    });
  }
  public _handleMouseMove(event: any) {
    if (this.mouse.down) {
      this.mouse.clickable = false;
      this.pointer = Object.assign({}, this.pointer, {
        endX: event.clientX,
        endY: event.clientY,
        endTime: new Date(),
      });

      if (this.context.onSort) {
        this._updatePointerMoveView();
      }
    }
  }
  public _handleMouseUp() {
    this._updatePointerUpView();

    const {currentIndex, targetIndex} = this._calcIndex();

    if (currentIndex !== null && targetIndex !== null && this.context.onSort) {
      this.context.onSort(currentIndex, targetIndex);
    }

    this.mouse.down = false;
    this.mouse.clickable = this.mouse.clickable;
    this.pointer = {
      startX: null,
      startY: null,
      startScrollTop: null,
      endX: null,
      endY: null,
    };
    setTimeout(() => {
      this.mouse.clickable = true;
    }, 0);
  }

  public _handleTouchStart(event: any) {
    this.touch.timerId = setTimeout(this._handleTouchHold.bind(this), THRESHOLD_HOLD_TIME);
    this.pointer = Object.assign({}, this.pointer, {
      startX: event.touches[0].clientX,
      startY: event.touches[0].clientY,
      startScrollTop: this.context.listElement().scrollTop,
      startTime: new Date(),
    });
  }
  public _handleTouchMove(event: any) {
    if (this.touch.holding) {
      event.stopPropagation();
      event.preventDefault();
    }

    const distance = Math.sqrt(
      Math.pow(event.touches[0].clientX - this.pointer.startX, 2) +
      Math.pow(event.touches[0].clientY - this.pointer.startY, 2),
    );

    if (distance > 10) {
      clearTimeout(this.touch.timerId);

      this.pointer = Object.assign({}, this.pointer, {
        endX: event.touches[0].clientX,
        endY: event.touches[0].clientY,
        endTime: new Date(),
      });

      if (this.touch.holding && this.context.onSort) {
        this._updatePointerMoveView();
      }
    }
  }
  public _handleTouchHold() {
    this.touch.holding = true;

    if (this.props.onTouchHold || this.context.onSort) {
      this._updateTouchHoldView();
    }

    if (this.props.onTouchHold) {
      this.props.onTouchHold();
    }
  }
  public _handleTouchEnd() {
    clearTimeout(this.touch.timerId);

    this._updatePointerUpView();

    const {currentIndex, targetIndex} = this._calcIndex();
    if (this.touch.holding && currentIndex !== null && targetIndex !== null && this.context.onSort) {
      this.context.onSort(currentIndex, targetIndex);
    }

    this.touch.timerId = null;
    this.touch.holding = false;
    this.pointer = {
      startX: null,
      startY: null,
      startScrollTop: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
    };
  }

  // update views
  public _updatePointerMoveView() {
    const listElement = this.context.listElement();

    listElement.classList.add('list__sorting');
    this.listItem.classList.add('list-item__sorting');

    this._moveCurrentListItemAnimation();
    this._moveListItemAnimation();
    this._scrollListView();
  }
  public _updatePointerUpView() {
    if (this.listItem.classList.contains('list-item__holding')) {
      this.listItem.classList.remove('list-item__holding');
    }
    if (this.listItem.classList.contains('list-item__sorting')) {
      this.listItem.classList.remove('list-item__sorting');
    }

    const listElement = this.context.listElement();
    const listItemElements = listElement.querySelectorAll('.list-item');

    for (const listItemElement of listItemElements) {
      listItemElement.style.transform = 'translateY(0px)';
      listItemElement.style.transitionProperty = transitionProperties.HEIGHT;
    }
  }
  public _updateTouchHoldView() {
    if (!this.listItem.classList.contains('list-item__holding')) {
      this.listItem.style.transitionProperty = transitionProperties.ALL;
      this.listItem.classList.add('list-item__holding');
    }
  }

  // animation
  public _moveCurrentListItemAnimation() {
    const diff = this._calcDiff();
    const scrollDiff = this.pointer.startScrollTop - this.context.listElement().scrollTop;

    this.listItem.style.transitionProperty = transitionProperties.NONE;
    this.listItem.style.transform = `translateY(${diff.y - scrollDiff}px)`;
  }
  public _moveListItemAnimation() {
    const listElement = this.context.listElement();
    const listItemElements = listElement.querySelectorAll('.list-item');

    const height = this.listItem.offsetHeight;

    const {currentIndex, targetIndex} = this._calcIndex();

    if (currentIndex !== null && targetIndex !== null) {
      if (currentIndex <= targetIndex) {
        for (let index = 0; index < listItemElements.length; index++) {
          const listItemElement = listItemElements[index];

          if (currentIndex < index && index <= targetIndex) {
            listItemElement.style.transitionProperty = transitionProperties.TRANSFORM;
            listItemElement.style.transform = `translateY(-${height}px)`;
          } else if (currentIndex !== index) {
            listItemElement.style.transitionProperty = transitionProperties.TRANSFORM;
            listItemElement.style.transform = 'translateY(0px)';
          }
        }
      }
      if (targetIndex <= currentIndex) {
        for (let index = 0; index < listItemElements.length; index++) {
          const listItemElement = listItemElements[index];

          if (targetIndex <= index && index < currentIndex) {
            listItemElement.style.transitionProperty = transitionProperties.TRANSFORM;
            listItemElement.style.transform = `translateY(${height}px)`;
          } else if (currentIndex !== index) {
            listItemElement.style.transitionProperty = transitionProperties.TRANSFORM;
            listItemElement.style.transform = 'translateY(0px)';
          }
        }
      }
    }
  }
  public _scrollListView() {
    const listElement = this.context.listElement();
    const listContentElement = listElement.querySelector('.list-content');
    const listElementRect = listElement.getBoundingClientRect();

    if (!this.timerId) {
      this.timerId = setInterval(() => {
        if (
          this.pointer.endY &&
          listElement.scrollTop > 0 &&
          this.pointer.endY < listElementRect.top + THRESHOLD_SCROLL_HEIGHT
        ) {
          listElement.scrollTop -= 3;
          this._moveCurrentListItemAnimation();
          this._moveListItemAnimation();
        } else if (
          this.pointer.endY &&
          listElement.scrollTop < listContentElement.offsetHeight - listElement.offsetHeight &&
          this.pointer.endY > listElementRect.top + listElement.offsetHeight - THRESHOLD_SCROLL_HEIGHT
        ) {
          listElement.scrollTop += 3;
          this._moveCurrentListItemAnimation();
          this._moveListItemAnimation();
        } else {
          clearTimeout(this.timerId);
          this.timerId = null;
        }
      }, 1000 / 60);
    }
  }
  public _calcDiff() {
    let x = this.pointer.endX - this.pointer.startX;
    let y = this.pointer.endY - this.pointer.startY;
    let time = this.pointer.endTime.getTime() - this.pointer.startTime.getTime();

    time = (time < 0) ? 0 : time;

    if (this.pointer.endX === null || this.pointer.endY === null) {
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
  public _calcIndex() {
    const listElement = this.context.listElement();
    const listItemElements = listElement.querySelectorAll('.list-item');

    const scrollTop = listElement.scrollTop;
    const listRect = listElement.getBoundingClientRect();
    const listTop = listRect.top;
    const listHeight = listRect.height;

    let currentIndex: number|null = null;
    let targetIndex: number|null = null;

    if (
      this.pointer.startX !== null &&
      this.pointer.startY !== null &&
      this.pointer.endX !== null &&
      this.pointer.endY !== null
    ) {
      for (let index = 0; index < listItemElements.length; index++) {
        const listItemElement = listItemElements[index];
        const targetRect = {
          top: listTop + listItemElement.offsetTop,
          height: listItemElement.offsetHeight,
        };

        if (listItemElement === this.listItem) {
          currentIndex = index;
        }
        if (this.pointer.endY < listTop) {
          targetIndex = 0;
        } else if (listTop + listHeight < this.pointer.endY) {
          targetIndex = listItemElements.length - 1;
        } else if (
        this.pointer.endX !== null && this.pointer.endY !== null &&
          targetRect.top - scrollTop < this.pointer.endY &&
          this.pointer.endY < targetRect.top + targetRect.height - scrollTop
      ) {
          targetIndex = index;
        }
      }
    }

    return {
      currentIndex,
      targetIndex,
    };
  }
  public _setListItem(listItem: any) {
    this.listItem = listItem;
  }
  public render() {
    const props = Object.assign({}, this.props);

    return (
      <div
        {...props}
        className={classNames(props.className, 'list-item')}
        ref={(el: any) => this._setListItem(el)}
        onMouseDown={(event: any) => this._handleMouseDown(event)}
        onMouseMove={(event: any) => this._handleMouseMove(event)}
        onMouseUp={() => this._handleMouseUp()}
        onClick={(event: any) => this._handleClick(event)}
        onTouchStart={(event: any) => this._handleTouchStart(event)}
        onTouchEnd={() => this._handleTouchEnd()}
        >{this.props.children}</div>
    );
  }
}
