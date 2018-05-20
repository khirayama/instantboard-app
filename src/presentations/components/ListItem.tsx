import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Transition } from 'react-transition-group';

import {
  THRESHOLD_HOLD_TIME,
  THRESHOLD_SCROLL_HEIGHT,
  TRANSITION_TIME,
  transitionProperties,
} from 'presentations/constants';

interface IDiff {
  x: number;
  y: number;
  time: number;
  delta: {
    x: number;
    y: number;
  };
}

interface IIndex {
  currentIndex: number | null;
  targetIndex: number | null;
}

export class ListItem extends React.Component<any, any> {
  private static contextTypes: any = {
    listElement: PropTypes.func,
    onSort: PropTypes.func,
  };

  private pointer: any;

  private timerId: any;

  private touch: any;

  private mouse: any;

  private ref: any;

  private listHeight: number;

  private isAnimating: boolean;

  private onMouseDown: any;

  private onMouseMove: any;

  private onMouseUp: any;

  private onClick: any;

  private onTouchStart: any;

  private onTouchMove: any;

  private onTouchEnd: any;

  private onEnter: any;

  private onEntering: any;

  private onEntered: any;

  private onExit: any;

  private onExiting: any;

  private onExited: any;

  constructor(props: any) {
    super(props);

    this.listHeight = 0;
    this.isAnimating = false;

    this.pointer = {
      startX: null,
      startY: null,
      startScrollTop: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
    };

    // Desktop
    this.mouse = {
      down: false,
      clickable: true,
    };

    // Mobile
    this.touch = {
      timerId: null,
      holding: false,
    };

    this.onClick = this.handleClick.bind(this);
    this.onMouseDown = this.handleMouseDown.bind(this);
    this.onMouseMove = this.handleMouseMove.bind(this);
    this.onMouseUp = this.handleMouseUp.bind(this);
    this.onTouchStart = this.handleTouchStart.bind(this);
    this.onTouchMove = this.handleTouchMove.bind(this);
    this.onTouchEnd = this.handleTouchEnd.bind(this);
    this.onEnter = this.handleEnter.bind(this);
    this.onEntering = this.handleEntering.bind(this);
    this.onEntered = this.handleEntered.bind(this);
    this.onExit = this.handleExit.bind(this);
    this.onExiting = this.handleExiting.bind(this);
    this.onExited = this.handleExited.bind(this);
  }

  public componentDidMount(): void {
    // Can't prevent event passive in Chrome.
    // because not use onTouchMove
    const el: HTMLElement = this.ref.current;
    el.addEventListener('touchmove', this.onTouchMove);
  }

  public componentWillUnount(): void {
    const el: HTMLElement = this.ref.current;
    el.removeEventListener('touchmove', this.onTouchMove);
  }

  public shouldComponentUpdate(): boolean {
    return !this.isAnimating;
  }

  public render(): JSX.Element {
    const { children, key, onExited } = this.props;
    const className: string = 'list-item';
    const props: any = { ...this.props };
    props.className = props.className ? `${props.className} ${className}` : className;

    delete props.appear;
    delete props.enter;
    delete props.exit;
    delete props.onExited;
    delete props.in;

    this.listHeight = 0;

    this.ref = React.createRef();

    return (
      <Transition
        key={key}
        in={this.props.in}
        timeout={TRANSITION_TIME}
        onEnter={this.onEnter}
        onEntering={this.onEntering}
        onEntered={this.onEntered}
        onExit={this.onExit}
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        <li
          role="listbox"
          {...props}
          ref={this.ref}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onClick={this.onClick}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
        >
          {children}
        </li>
      </Transition>
    );
  }

  private handleClick(event: any): void {
    const { onClick } = this.props;

    if (this.mouse.clickable && onClick) {
      onClick(event);
    }
  }

  private handleMouseDown(event: any): void {
    const { listElement } = this.context;

    this.mouse.down = true;
    this.pointer = {
      ...this.pointer,
      startX: event.clientX,
      startY: event.clientY,
      startScrollTop: listElement().scrollTop,
      startTime: new Date(),
    };
  }

  private handleMouseMove(event: any): void {
    const { onSort } = this.context;

    if (this.mouse.down) {
      this.mouse.clickable = false;
      this.pointer = {
        ...this.pointer,
        endX: event.clientX,
        endY: event.clientY,
        endTime: new Date(),
      };

      if (onSort) {
        this.updatePointerMoveView();
      }
    }
  }

  private handleMouseUp(): void {
    const { onSort } = this.context;

    this.updatePointerUpView();

    const { currentIndex, targetIndex } = this.calcIndex();

    if (currentIndex !== null && targetIndex !== null && onSort) {
      onSort(currentIndex, targetIndex);
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

  private handleTouchStart(event: any): void {
    const { listElement } = this.context;
    this.touch.timerId = setTimeout(this.handleTouchHold.bind(this), THRESHOLD_HOLD_TIME);
    this.pointer = {
      ...this.pointer,
      startX: event.touches[0].clientX,
      startY: event.touches[0].clientY,
      startScrollTop: listElement().scrollTop,
      startTime: new Date(),
    };
  }

  private handleTouchMove(event: any): void {
    const { onSort } = this.context;

    if (this.touch.holding) {
      event.stopPropagation();
      event.preventDefault();
    }

    const distance: number = Math.sqrt(
      Math.pow(event.touches[0].clientX - this.pointer.startX, 2) +
        Math.pow(event.touches[0].clientY - this.pointer.startY, 2),
    );

    if (distance > 10) {
      clearTimeout(this.touch.timerId);

      this.pointer = {
        ...this.pointer,
        endX: event.touches[0].clientX,
        endY: event.touches[0].clientY,
        endTime: new Date(),
      };

      if (this.touch.holding && onSort) {
        this.updatePointerMoveView();
      }
    }
  }

  private handleTouchHold(): void {
    const { onSort } = this.context;
    const { onTouchHold } = this.props;
    this.touch.holding = true;

    if (onTouchHold || onSort) {
      this.updateTouchHoldView();
    }

    if (onTouchHold) {
      onTouchHold();
    }
  }

  private handleTouchEnd(): void {
    const { onSort } = this.context;
    clearTimeout(this.touch.timerId);

    this.updatePointerUpView();

    const { currentIndex, targetIndex } = this.calcIndex();
    if (this.touch.holding && currentIndex !== null && targetIndex !== null && onSort) {
      onSort(currentIndex, targetIndex);
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

  private handleEnter(): void {
    this.isAnimating = true;

    const el: HTMLElement = this.ref.current;
    this.listHeight = el.offsetHeight;
    el.style.minHeight = 'auto';
    el.style.maxHeight = '0px';
    el.style.transitionProperty = transitionProperties.MAX_HEIGHT;
  }

  private handleEntering(): void {
    const el: HTMLElement = this.ref.current;
    setTimeout(() => {
      el.style.maxHeight = `${this.listHeight}px`;
    }, 0);
  }

  private handleEntered(): void {
    this.isAnimating = false;

    const el: HTMLElement = this.ref.current;
    el.style.minHeight = `${this.listHeight}px`;
    el.style.maxHeight = '';
    el.style.transitionProperty = '';
    this.listHeight = 0;
  }

  private handleExit(): void {
    this.isAnimating = true;

    const el: HTMLElement = this.ref.current;
    this.listHeight = el.offsetHeight;

    el.style.height = `${this.listHeight}px`;
    el.style.minHeight = 'auto';
    el.style.transitionProperty = transitionProperties.HEIGHT;
  }

  private handleExiting(): void {
    const el: HTMLElement = this.ref.current;
    setTimeout(() => {
      el.style.height = '0px';
    }, 0);
  }

  private handleExited(): void {
    this.isAnimating = false;

    const { onExited } = this.props;
    onExited();
  }

  // Update views
  private updatePointerMoveView(): void {
    const { listElement } = this.context;
    const el: HTMLElement = this.ref.current;

    listElement().classList.add('list__sorting');
    el.classList.add('list-item__sorting');

    this.moveCurrentListItemAnimation();
    this.moveListItemAnimation();
    this.scrollListView();
  }

  private updatePointerUpView(): void {
    const { listElement } = this.context;
    const el: HTMLElement = this.ref.current;

    if (el.classList.contains('list-item__holding')) {
      el.classList.remove('list-item__holding');
    }
    if (el.classList.contains('list-item__sorting')) {
      el.classList.remove('list-item__sorting');
    }

    const listItemElements: NodeListOf<HTMLElement> = listElement().querySelectorAll('.list-item');

    for (const listItemElement of listItemElements) {
      listItemElement.style.transform = 'translateY(0px)';
      listItemElement.style.transitionProperty = transitionProperties.HEIGHT;
    }
  }

  private updateTouchHoldView(): void {
    const el: HTMLElement = this.ref.current;

    if (!el.classList.contains('list-item__holding')) {
      el.style.transitionProperty = transitionProperties.ALL;
      el.classList.add('list-item__holding');
    }
  }

  // Animation
  private moveCurrentListItemAnimation(): void {
    const { listElement } = this.context;
    const diff: IDiff = this.calcDiff();
    const scrollDiff: number = this.pointer.startScrollTop - listElement().scrollTop;
    const el: HTMLElement = this.ref.current;

    el.style.transitionProperty = transitionProperties.NONE;
    el.style.transform = `translateY(${diff.y - scrollDiff}px)`;
  }

  private moveListItemAnimation(): void {
    const { listElement } = this.context;
    const listItemElements: NodeListOf<HTMLElement> = listElement().querySelectorAll('.list-item');
    const el: HTMLElement = this.ref.current;
    const height: number = el.offsetHeight;

    const { currentIndex, targetIndex } = this.calcIndex();

    if (currentIndex !== null && targetIndex !== null) {
      if (currentIndex <= targetIndex) {
        for (let index: number = 0; index < listItemElements.length; index += 1) {
          const listItemElement: HTMLElement = listItemElements[index];

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
        for (let index: number = 0; index < listItemElements.length; index += 1) {
          const listItemElement: HTMLElement = listItemElements[index];

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

  private scrollListView(): void {
    const { listElement } = this.context;
    const listContentElement: HTMLElement = listElement().querySelector('.list-content');
    const listElementRect: any = listElement().getBoundingClientRect();

    if (!this.timerId) {
      this.timerId = setInterval(() => {
        if (
          this.pointer.endY &&
          listElement().scrollTop > 0 &&
          this.pointer.endY < listElementRect.top + THRESHOLD_SCROLL_HEIGHT
        ) {
          listElement().scrollTop -= 3;
          this.moveCurrentListItemAnimation();
          this.moveListItemAnimation();
        } else if (
          this.pointer.endY &&
          listElement().scrollTop < listContentElement.offsetHeight - listElement().offsetHeight &&
          this.pointer.endY > listElementRect.top + listElement().offsetHeight - THRESHOLD_SCROLL_HEIGHT
        ) {
          listElement().scrollTop += 3;
          this.moveCurrentListItemAnimation();
          this.moveListItemAnimation();
        } else {
          clearTimeout(this.timerId);
          this.timerId = null;
        }
      }, 1000 / 60);
    }
  }

  private calcDiff(): IDiff {
    let x: number = this.pointer.endX - this.pointer.startX;
    let y: number = this.pointer.endY - this.pointer.startY;
    let time: number = this.pointer.endTime.getTime() - this.pointer.startTime.getTime();

    time = time < 0 ? 0 : time;

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

  private calcIndex(): IIndex {
    const { listElement } = this.context;
    const el: HTMLElement = this.ref.current;
    const listItemElements: NodeListOf<HTMLElement> = listElement().querySelectorAll('.list-item');

    const scrollTop: number = listElement().scrollTop;
    const listRect: any = listElement().getBoundingClientRect();
    const listTop: number = listRect.top;
    const listHeight: number = listRect.height;

    let currentIndex: number | null = null;
    let targetIndex: number | null = null;

    if (
      this.pointer.startX !== null &&
      this.pointer.startY !== null &&
      this.pointer.endX !== null &&
      this.pointer.endY !== null
    ) {
      for (let index: number = 0; index < listItemElements.length; index += 1) {
        const listItemElement: HTMLElement = listItemElements[index];
        const targetRect: any = {
          top: listTop + listItemElement.offsetTop,
          height: listItemElement.offsetHeight,
        };

        if (listItemElement === el) {
          currentIndex = index;
        }
        if (this.pointer.endY < listTop) {
          targetIndex = 0;
        } else if (listTop + listHeight < this.pointer.endY) {
          targetIndex = listItemElements.length - 1;
        } else if (
          this.pointer.endX !== null &&
          this.pointer.endY !== null &&
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
}
