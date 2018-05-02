import * as React from 'react';

import { Icon } from 'presentations/components/Icon';
import { Link } from 'router/Link';

interface ITaskFormProps {
  selectedLabelId: number;
  labels: ILabel[];
  onSubmit(
    event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>,
    props: ITaskFormProps,
    state: ITaskFormState,
  ): void;
}

interface ITaskFormState {
  labelId: number;
  content: string;
}

export class TaskForm extends React.Component<ITaskFormProps, ITaskFormState> {
  private onChangeLabelIdSelect: (event: React.FormEvent<HTMLSelectElement>) => void;

  private onChangeContentInput: (event: React.FormEvent<HTMLInputElement>) => void;

  private onKeyDownContentInput: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  private onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

  constructor(props: ITaskFormProps) {
    super(props);

    this.state = {
      labelId: this.props.selectedLabelId,
      content: '',
    };

    this.onChangeLabelIdSelect = this.handleChangeLabelIdSelect.bind(this);
    this.onChangeContentInput = this.handleChangeContentInput.bind(this);
    this.onKeyDownContentInput = this.handleKeyDownContentInput.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);
  }

  public render(): JSX.Element {
    const { labels } = this.props;

    return (
      <form className="task-form" onSubmit={this.onSubmit}>
        <Link to="/labels">
          <Icon type="label" />
        </Link>
        <div>
          <input
            type="text"
            autoFocus
            value={this.state.content}
            onChange={this.onChangeContentInput}
            onKeyDown={this.onKeyDownContentInput}
            placeholder="Enter task text"
          />
        </div>
        <div>
          {this.state.labelId ? (
            <select value={this.state.labelId} onChange={this.onChangeLabelIdSelect}>
              {labels.map((label: ILabel): React.ReactNode => (
                <option key={label.id} value={label.id} aria-selected={this.state.labelId === label.id}>
                  {label.name}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    );
  }

  private handleChangeLabelIdSelect(event: React.FormEvent<HTMLSelectElement>): void {
    this.setState({ labelId: Number(event.currentTarget.value) });
  }

  private handleChangeContentInput(event: React.FormEvent<HTMLInputElement>): void {
    this.setState({ content: event.currentTarget.value });
  }

  private handleKeyDownContentInput(event: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER_KEY_CODE: number = 13;
    const { onSubmit } = this.props;

    if (event.keyCode === ENTER_KEY_CODE && onSubmit) {
      event.preventDefault();
      onSubmit(event, this.props, this.state);
    }
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    const { onSubmit } = this.props;

    event.preventDefault();

    if (onSubmit) {
      onSubmit(event, this.props, this.state);
    }
  }
}
