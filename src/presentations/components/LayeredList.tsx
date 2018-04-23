import * as PropTypes from 'prop-types';
import * as React from 'react';

export class LayeredList extends React.Component<any, any> {
  private static childContextTypes: any = {
    currentIndex: PropTypes.number,
    setCurrentIndex: PropTypes.func,
  };

  constructor(props: any) {
    super(props);

    this.state = {
      currentIndex: props.index || 0,
    };
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

  public render(): JSX.Element {
    const { children } = this.props;
    const props: any = {
      ...this.props,
      index: undefined,
    };
    const className: string = 'layered-list';
    props.className = props.className ? `$[props.className} ${className}` : className;

    return <div {...props}>{children}</div>;
  }

  private setCurrentIndex(index: number): void {
    const { onChange } = this.props;

    this.setState({ currentIndex: index });
    if (onChange) {
      onChange(index);
    }
  }
}
