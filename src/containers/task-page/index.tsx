import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  fetchLabel,
} from '../../action-creators/label';
import {
  createTask,
  fetchTask,
  updateTask,
} from '../../action-creators/task';
import queryString from '../../utils/query-string';
import Container from '../container';

export default class TaskPage extends Container<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleChangeLabelIdSelect: any;

  private handleChangeContentInput: any;

  private handleSubmit: any;

  constructor(props: any) {
    super(props);

    this.state = Object.assign({}, this.state, {
      taskId: (props.params.id) ? Number(props.params.id) : null,
      content: '',
      labelId: null,
    });

    this.actions = {
      fetchLabel: () => {
        fetchLabel(this.dispatch);
      },
      fetchTask: () => {
        fetchTask(this.dispatch);
      },
      createTask: (task: ITaskRequest) => {
        createTask(this.dispatch, task).then(() => {
          this.context.move('/');
        });
      },
      updateTask: (task: ITaskRequest) => {
        updateTask(this.dispatch, task).then(() => {
          this.context.move('/');
        });
      },
    };

    this.handleChangeLabelIdSelect = this._handleChangeLabelIdSelect.bind(this);
    this.handleChangeContentInput = this._handleChangeContentInput.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  public componentDidMount() {
    this.actions.fetchLabel();
    this.actions.fetchTask();
  }

  public componentDidUpdate(prevProps, prevState) {
    const ui = this.state.ui;
    const prevUi = prevState.ui;
    const tasks = this.state.tasks;
    const labels = this.state.labels;

    let selectedLabelId: number|null = null;
    if (typeof window === 'object') {
      const query = queryString.parse(window.location.search);
      if (query['label-id']) {
        selectedLabelId = Number(query['label-id']);
      }
    }

    if (prevUi.isLoadingLabels && !ui.isLoadingLabels && labels.length !== 0) {
      let labelId = labels[0].id;
      for (const label of labels) {
        if (label.id === selectedLabelId) {
          labelId = label.id;
          break;
        }
      }
      this.setState({labelId});
    }

    if (prevUi.isLoadingTasks && !ui.isLoadingTasks && tasks.length !== 0 && this.state.taskId) {
      for (const task of tasks) {
        if (task.id === this.state.taskId) {
          this.setState({content: task.content});
          break;
        }
      }
    }
  }

  public render() {
    const labels = this.state.labels;

    return (
      <section className="page task-page">
        <form onSubmit={this.handleSubmit}>
          {(this.state.labelId) ? (
            <select value={this.state.labelId} onChange={this.handleChangeLabelIdSelect}>
              {labels.map((label: any) => <option key={label.id} value={label.id}>{label.name}</option>)}
            </select>
          ) : null}
          <input type="text" autoFocus value={this.state.content} onChange={this.handleChangeContentInput} />
          <button>Create!</button>
        </form>
      </section>
    );
  }

  private _handleChangeLabelIdSelect(event: any) {
    this.setState({labelId: event.currentTarget.value});
  }

  private _handleChangeContentInput(event: any) {
    this.setState({content: event.currentTarget.value});
  }

  private _handleSubmit(event: any) {
    event.preventDefault();

    const content = this.state.content.trim();
    const id = this.props.params.id;

    if (content) {
      if (id === undefined || id === null) {
        this.actions.createTask({
          content,
          labelId: this.state.labelId,
        });
      } else {
        this.actions.updateTask({
          id,
          content,
          labelId: this.state.labelId,
        });
      }
    }
  }
}
