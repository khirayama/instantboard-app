import * as PropTypes from 'prop-types';
import * as React from 'react';
import { fetchLabel } from '../../../action-creators/label';
import { createTask, fetchTask, updateTask } from '../../../action-creators/task';
import Link from '../../../router/link';
import queryString from '../../../utils/query-string';
import Icon from '../../components/icon';
import Indicator from '../../components/indicator';
import Container from '../container';

interface ITaskMobilePageState {
  taskId: number | null;
  content: string;
  labelId: number | null;
  uiBlocking: boolean;
}

export default class TaskMobilePage extends Container<{}, ITaskMobilePageState> {
  public static contextTypes: { move: any } = {
    move: PropTypes.func,
  };

  private handleChangeLabelIdSelect: (event: React.FormEvent<HTMLSelectElement>) => void;

  private handleChangeContentInput: (event: React.FormEvent<HTMLInputElement>) => void;

  private handleKeyDownContentInput: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  private handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

  constructor(props: IContainerProps) {
    super(props);

    const { params }: { params: { id: string } } = props;
    const initialState: ITaskMobilePageState = {
      taskId: params.id ? Number(params.id) : null,
      content: '',
      labelId: null,
      uiBlocking: false,
    };

    this.state = Object.assign({}, this.getState(), initialState);

    this.actions = {
      fetchLabel: (): Promise<{}> => {
        return fetchLabel(this.dispatch);
      },
      fetchTask: (): Promise<{}> => {
        return fetchTask(this.dispatch);
      },
      createTask: (task: ITaskRequestParams): Promise<{}> => {
        return createTask(this.dispatch, task);
      },
      updateTask: (task: ITaskRequestId & ITaskRequestParams): Promise<{}> => {
        return updateTask(this.dispatch, task);
      },
    };

    this.handleChangeLabelIdSelect = this._handleChangeLabelIdSelect.bind(this);
    this.handleChangeContentInput = this._handleChangeContentInput.bind(this);
    this.handleKeyDownContentInput = this._handleKeyDownContentInput.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  public componentDidMount(): void {
    this.actions.fetchLabel();
    this.actions.fetchTask();
  }

  public componentDidUpdate(prevProps, prevState): void {
    this.onUpdate((): void => {
      const prevUi: IUI = prevState.ui;
      const ui: IUI = this.state.ui;
      const tasks: ITask[] = this.state.tasks;
      const labels: ILabel[] = this.state.labels;

      let selectedLabelId: number | null = null;
      if (typeof window === 'object') {
        const query: {} = queryString.parse(window.location.search);
        if (query['label-id']) {
          selectedLabelId = Number(query['label-id']);
        }
      }

      if (prevUi.isLoadingLabels && !ui.isLoadingLabels && labels.length !== 0) {
        let labelId: number = labels[0].id;
        for (const label of labels) {
          if (label.id === selectedLabelId) {
            labelId = label.id;
            break;
          }
        }
        this.setState({ labelId });
      }

      if (prevUi.isLoadingTasks && !ui.isLoadingTasks && tasks.length !== 0 && this.state.taskId) {
        for (const task of tasks) {
          if (task.id === this.state.taskId) {
            this.setState({ content: task.content });
            break;
          }
        }
      }
    });
  }

  public render() {
    const ui: IUI = this.state.ui;
    const labels: ILabel[] = this.state.labels;

    return (
      <section className="page task-mobile-page">
        {this.state.uiBlocking ? <div className="ui-block" /> : null}
        <Indicator active={ui.isLoadingTasks} />
        <form onSubmit={this.handleSubmit}>
          <header className="task-mobile-page--header">
            <Link to="/">
              <Icon type="back" />
            </Link>
            <button type="submit">
              <Icon type="send" />
            </button>
          </header>
          <div className="task-mobile-page--label-block">
            <Link to="/labels">
              <Icon type="label" />
            </Link>
            {this.state.labelId ? (
              <select value={this.state.labelId} onChange={this.handleChangeLabelIdSelect}>
                {labels.map((label: ILabel): React.ReactNode => (
                  <option key={label.id} value={label.id}>
                    {label.name}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              className="task-mobile-page--task-content-input"
              autoFocus
              value={this.state.content}
              onChange={this.handleChangeContentInput}
              onKeyDown={this.handleKeyDownContentInput}
              placeholder="Enter task text"
            />
          </div>
        </form>
      </section>
    );
  }

  private onUpdate(callback: () => void): void {
    callback();
  }

  private _handleChangeLabelIdSelect(event: React.FormEvent<HTMLSelectElement>): void {
    this.setState({ labelId: Number(event.currentTarget.value) });
  }

  private _handleChangeContentInput(event: React.FormEvent<HTMLInputElement>): void {
    this.setState({ content: event.currentTarget.value });
  }

  private _handleKeyDownContentInput(event: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER_KEY_CODE: number = 13;

    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      this.submitTask();
    }
  }

  private _handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    this.submitTask();
  }

  private submitTask(): void {
    const content: string = this.state.content.trim();
    const id: number | null = this.props.params.id === undefined ? null : Number(this.props.params.id);

    if (content && !this.state.uiBlocking) {
      this.setState({ uiBlocking: true });

      if (id === null) {
        this.actions
          .createTask({
            content,
            labelId: this.state.labelId,
          })
          .then(() => {
            this.context.move('/');
          });
      } else {
        this.actions
          .updateTask({
            id,
            content,
            labelId: this.state.labelId,
          })
          .then(() => {
            this.context.move('/');
          });
      }
    }
  }
}
