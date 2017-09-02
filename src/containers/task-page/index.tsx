import * as PropTypes from 'prop-types';
import * as React from 'react';
import {createTask} from '../../action-creators';
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
      labelId: this.state.labels[0].id,
    });

    this.actions = {
      createTask: (task) => {
        createTask(this.dispatch, task).then(() => {
          this.context.move('/');
        });
      },
    };

    this.handleChangeLabelIdSelect = this._handleChangeLabelIdSelect.bind(this);
    this.handleChangeContentInput = this._handleChangeContentInput.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
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
    if (content) {
      this.actions.createTask({
        content,
        labelId: this.state.labelId,
      });
    }
  }

  public render() {
    const labels = this.state.labels;

    return (
      <section className="page task-page">
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.labelId} onChange={this.handleChangeLabelIdSelect}>{labels.map((label: any) => <option key={label.id}>{label.name}</option>)}</select>
          <input type="text" autoFocus value={this.state.name} onChange={this.handleChangeContentInput} />
          <button>Create!</button>
        </form>
      </section>
    );
  }
}
