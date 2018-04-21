import {
  THRESHOLD_HOLD_TIME,
  THRESHOLD_SCROLL_HEIGHT,
  TRANSITION_TIME,
  transitionProperties,
} from 'presentations/constants';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Transition from 'react-transition-group/Transition';

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

  private listItem: any;

  private pointer: any;

  private timerId: any;

  private touch: any;

  private mouse: any;

  private refListItem: any;

  private onMouseDown: any;

  private onMouseMove: any;

  private onMouseUp: any;

  private onClick: any;

  private onTouchStart: any;

  private onTouchMove: any;

  private onTouchEnd: any;

  constructor(props: any) {
    super(props);

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

    this.refListItem = this.setListItem.bind(this);
    this.onClick = this.handleClick.bind(this);
    this.onMouseDown = this.handleMouseDown.bind(this);
    this.onMouseMove = this.handleMouseMove.bind(this);
    this.onMouseUp = this.handleMouseUp.bind(this);
    this.onTouchStart = this.handleTouchStart.bind(this);
    this.onTouchMove = this.handleTouchMove.bind(this);
    this.onTouchEnd = this.handleTouchEnd.bind(this);
  }

  public componentDidMount(): void {
    // Can't prevent event passive in Chrome.
    // because not use onTouchMove
    this.listItem.addEventListener('touchmove', this.onTouchMove);
  }

  public componentWillUnount(): void {
    this.listItem.removeEventListener('touchmove', this.onTouchMove);
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

    let listHeight: number = 0;

    const handleEnter: any = (): void => {
      const el: HTMLElement = this.listItem;
      listHeight = el.offsetHeight;
      el.style.minHeight = 'auto';
      el.style.maxHeight = '0px';
      el.style.transitionProperty = transitionProperties.MAX_HEIGHT;
    };

    const handleEntering: any = (): void => {
      const el: HTMLElement = this.listItem;
      setTimeout(() => {
        el.style.maxHeight = `${listHeight}px`;
      }, 0);
    };

    const handleEntered: any = (): void => {
      const el: HTMLElement = this.listItem;
      el.style.minHeight = `${listHeight}px`;
      el.style.maxHeight = '';
      el.style.transitionProperty = '';
      listHeight = 0;
    };

    const handleExit: any = (): void => {
      const el: HTMLElement = this.listItem;
      listHeight = el.offsetHeight;

      el.style.height = `${listHeight}px`;
      el.style.minHeight = 'auto';
      el.style.transitionProperty = transitionProperties.HEIGHT;
    };

    const handleExiting: any = (): void => {
      const el: HTMLElement = this.listItem;
      setTimeout(() => {
        el.style.height = '0px';
      }, 0);
    };

    const handleExited: any = (): void => {
      onExited();
    };

    return (
      <Transition
        key={key}
        in={this.props.in} // eslint-disable-line
        timeout={TRANSITION_TIME}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        onExit={handleExit}
        onExiting={handleExiting}
        onExited={handleExited}
      >
        <li
          {...props}
          ref={this.refListItem}
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

  // Update views
  private updatePointerMoveView(): void {
    const { listElement } = this.context;

    listElement().classList.add('list__sorting');
    this.listItem.classList.add('list-item__sorting');

    this.moveCurrentListItemAnimation();
    this.moveListItemAnimation();
    this.scrollListView();
  }

  private updatePointerUpView(): void {
    const { listElement } = this.context;
    if (this.listItem.classList.contains('list-item__holding')) {
      this.listItem.classList.remove('list-item__holding');
    }
    if (this.listItem.classList.contains('list-item__sorting')) {
      this.listItem.classList.remove('list-item__sorting');
    }

    const listItemElements: NodeListOf<HTMLElement> = listElement().querySelectorAll('.list-item');

    for (const listItemElement of listItemElements) {
      listItemElement.style.transform = 'translateY(0px)';
      listItemElement.style.transitionProperty = transitionProperties.HEIGHT;
    }
  }

  private updateTouchHoldView(): void {
    if (!this.listItem.classList.contains('list-item__holding')) {
      this.listItem.style.transitionProperty = transitionProperties.ALL;
      this.listItem.classList.add('list-item__holding');
    }
  }

  // Animation
  private moveCurrentListItemAnimation(): void {
    const { listElement } = this.context;
    const diff: IDiff = this.calcDiff();
    const scrollDiff: number = this.pointer.startScrollTop - listElement().scrollTop;

    this.listItem.style.transitionProperty = transitionProperties.NONE;
    this.listItem.style.transform = `translateY(${diff.y - scrollDiff}px)`;
  }

  private moveListItemAnimation(): void {
    const { listElement } = this.context;
    const listItemElements: NodeListOf<HTMLElement> = listElement().querySelectorAll('.list-item');
    const height: number = this.listItem.offsetHeight;

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

        if (listItemElement === this.listItem) {
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

  private setListItem(listItem: any): void {
    this.listItem = listItem;
  }
}
