import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as queryString from 'query-string';
import {
  fetchLabel,
  fetchTask,
  createTask,
  updateTask,
} from '../../action-creators';
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
    const selectedTaskId = this.props.params.id;

    let selectedLabelId = null;
    if (typeof window === 'object') {
      const query = queryString.parse(window.location.search);
      if (query['label-id']) {
        selectedLabelId = query['label-id'];
      }
    }

    if (prevUi.isLoadingLabels && !ui.isLoadingLabels && labels.length !== 0) {
      let labelId = labels[0].id;
      for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        if (label.id === selectedLabelId) {
          labelId = label.id;
          break;
        }
      }
      this.setState({labelId});
    }

    if (prevUi.isLoadingTasks && !ui.isLoadingTasks && tasks.length !== 0 && selectedTaskId) {
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task.id === selectedTaskId) {
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
