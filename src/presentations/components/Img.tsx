import * as classNames from 'classnames';
import * as React from 'react';

type IProps = any;

interface IState {
  src: string;
  hasError: boolean;
  completed: boolean;
}

export class Img extends React.Component<IProps, IState> {
  private onLoad: () => void;

  private onError: () => void;

  constructor(props: IProps) {
    super(props);

    this.state = {
      src: this.props.src,
      hasError: false,
      completed: false,
    };

    this.onLoad = this.handleLoad.bind(this);
    this.onError = this.handleError.bind(this);
  }

  public render(): JSX.Element {
    const props: IProps = { ...this.props };
    props.className = classNames(
      props.className,
      'img',
      { img__error: this.state.hasError },
      { img__completed: this.state.completed },
    );
    delete props.src;

    return this.state.hasError ? (
      <span {...props}>{props.alt}</span>
    ) : (
      <img {...props} src={this.state.src} onLoad={this.onLoad} onError={this.onError} />
    );
  }

  private handleLoad(): void {
    this.setState({ completed: true });
  }

  private handleError(): void {
    if (this.props.errorsrc && this.props.errorsrc !== this.state.src) {
      this.setState({
        src: this.props.errorsrc,
      });
    } else if (this.props.errorsrc === this.state.src) {
      this.setState({
        completed: true,
        hasError: true,
      });
    } else if (!this.props.errorsrc) {
      this.setState({
        completed: true,
        hasError: true,
      });
    }
  }
}
