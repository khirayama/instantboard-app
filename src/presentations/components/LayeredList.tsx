import * as React from 'react';

export const context: any = React.createContext(null);

export class LayeredList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentIndex: props.index || 0,
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

    const ctx: any = {
      currentIndex: this.state.currentIndex,
      setCurrentIndex: (index: number): void => {
        this.setCurrentIndex(index);
      },
    };

    return (
      <context.Provider value={ctx}>
        <div {...props}>{children}</div>
      </context.Provider>
    );
  }

  private setCurrentIndex(index: number): void {
    const { onChange } = this.props;

    this.setState({ currentIndex: index });
    if (onChange) {
      onChange(index);
    }
  }
}
