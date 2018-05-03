import * as React from 'react';

import { Icon } from 'presentations/components/Icon';
import { Link } from 'router/Link';

interface ITaskFormProps {
  selectedLabelId: number | null;
  selectedTaskId: number | null;
  tasks: ITask[];
  labels: ILabel[];
  onSubmit(event: React.FormEvent<HTMLFormElement>, props: ITaskFormProps, state: ITaskFormState): void;
  onSubmitWithEnter(event: React.KeyboardEvent<HTMLInputElement>, props: ITaskFormProps, state: ITaskFormState): void;
}

interface ITaskFormState {
  labelId: number | null;
  taskId: number | null;
  content: string;
}

export class TaskForm extends React.Component<ITaskFormProps, ITaskFormState> {
  private onChangeLabelIdSelect: (event: React.FormEvent<HTMLSelectElement>) => void;

  private onChangeContentInput: (event: React.FormEvent<HTMLInputElement>) => void;

  private onKeyDownContentInput: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  private onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

  constructor(props: ITaskFormProps) {
    super(props);

    const selectedTask: ITask | null =
      this.props.tasks.filter((task: ITask) => {
        return task.id === this.props.selectedTaskId;
      })[0] || null;

    this.state = {
      labelId: this.props.selectedLabelId,
      taskId: this.props.selectedTaskId,
      content: selectedTask === null ? '' : selectedTask.content,
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
        <input
          className="task-form--content-input"
          type="text"
          autoFocus
          value={this.state.content}
          onChange={this.onChangeContentInput}
          onKeyDown={this.onKeyDownContentInput}
          placeholder="Enter task text"
        />
        <div className="task-form--label-select-box">
          <Link to="/labels">
            <Icon type="label" />
          </Link>
          {this.state.labelId ? (
            <select
              className="task-form--label-select-box--select"
              value={this.state.labelId}
              onChange={this.onChangeLabelIdSelect}
            >
              {labels.map((label: ILabel): React.ReactNode => (
                <option key={label.id} value={label.id} aria-selected={this.state.labelId === label.id}>
                  {label.name}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <div className="task-form--button-box">
          <button className="task-form--button-box--button">
            <Icon type="send" />
          </button>
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
    const { onSubmitWithEnter } = this.props;

    if (event.keyCode === ENTER_KEY_CODE && onSubmitWithEnter) {
      event.preventDefault();
      onSubmitWithEnter(event, this.props, this.state);
      this.setState({ content: '' });
    }
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    const { onSubmit } = this.props;

    if (onSubmit) {
      event.preventDefault();
      onSubmit(event, this.props, this.state);
    }
  }
}
