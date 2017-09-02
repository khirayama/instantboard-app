import * as PropTypes from 'prop-types';
import * as React from 'react';
import {createLabel} from '../../action-creators';
import Container from '../container';

export default class LabelPage extends Container<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleChangeNameInput: any;

  private handleSubmit: any;

  constructor(props: any) {
    super(props);

    let name = '';
    if (this.state.ui.selectedLabelId) {
      this.state.labels.forEach((label: ILabel) => {
        if (label.id === this.state.ui.selectedLabelId) {
          name = label.name;
        }
      });
    }

    this.state = Object.assign({}, this.state, {name});

    this.actions = {
      createLabel: (label) => {
        createLabel(this.dispatch, label).then(() => {
          this.context.move('/labels');
        });
      },
    };

    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  private _handleChangeNameInput(event: any) {
    this.setState({name: event.currentTarget.value});
  }

  private _handleSubmit(event: any) {
    event.preventDefault();
    const name = this.state.name.trim();
    if (name) {
      this.actions.createLabel({name});
    }
  }

  public render() {
    return (
      <section className="page label-page">
        <form onSubmit={this.handleSubmit}>
          <input type="text" autoFocus value={this.state.name} onChange={this.handleChangeNameInput} />
          <button>Create!</button>
        </form>
      </section>
    );
  }
}
