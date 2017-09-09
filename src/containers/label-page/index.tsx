import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  createLabel,
  updateLabel,
  fetchLabel,
  fetchMember,
} from '../../action-creators';
import Container from '../container';

export default class LabelPage extends Container<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleChangeNameInput: any;

  private handleSubmitLabelForm: any;

  private handleChangeMemberNameInput: any;

  private handleSubmitMemberNameForm: any;

  constructor(props: any) {
    super(props);

    this.state = Object.assign({}, this.state, {
      labelName: '',
      memberName: '',
      memberNames: [],
    });

    this.actions = {
      fetchMember: () => {
        fetchMember(this.dispatch);
      },
      fetchLabel: () => {
        fetchLabel(this.dispatch);
      },
      createLabel: (label: ILabelRequest) => {
        createLabel(this.dispatch, label).then(() => {
          this.context.move('/labels');
        });
      },
      updateLabel: (label: ILabelRequest) => {
        updateLabel(this.dispatch, label).then(() => {
          this.context.move('/labels');
        });
      },
    };

    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleSubmitLabelForm = this._handleSubmitLabelForm.bind(this);
    this.handleChangeMemberNameInput = this._handleChangeMemberNameInput.bind(this);
    this.handleSubmitMemberNameForm = this._handleSubmitMemberNameForm.bind(this);
  }

  public componentDidMount() {
    this.actions.fetchLabel();
    this.actions.fetchMember();
  }

  public componentDidUpdate(prevProps, prevState) {
    const ui = this.state.ui;
    const prevUi = prevState.ui;
    const labels = this.state.labels;
    const selectedLabelId = this.props.params.id;

    if (prevUi.isLoadingLabels && !ui.isLoadingLabels && labels.length !== 0 && selectedLabelId) {
      for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        if (label.id === selectedLabelId) {
          this.setState({
            labelName: label.name,
            members: label.members,
          });
          break;
        }
      }
    }
  }

  public render() {
    return (
      <section className="page label-page">
        <form onSubmit={this.handleSubmitMemberNameForm}>
          <input type="text" value={this.state.memberName} onChange={this.handleChangeMemberNameInput} />
          <ul>{this.state.members.map((member, index) => <li key={index}>{member.name}</li>)}</ul>
        </form>
        <form onSubmit={this.handleSubmitLabelForm}>
          <input type="text" autoFocus value={this.state.labelName} onChange={this.handleChangeNameInput} />
          <button>Create!</button>
        </form>
      </section>
    );
  }

  private _handleChangeNameInput(event: any) {
    this.setState({labelName: event.currentTarget.value});
  }

  private _handleSubmitLabelForm(event: any) {
    event.preventDefault();

    const labelName = this.state.labelName.trim();
    const members = this.state.members;
    const id = this.props.params.id;

    if (labelName) {
      if (id === undefined || id === null) {
        this.actions.createLabel({
          name: labelName,
          members,
        });
      } else {
        this.actions.updateLabel({
          id,
          name: labelName,
          members,
        });
      }
    }
  }

  private _handleChangeMemberNameInput(event: any) {
    this.setState({memberName: event.currentTarget.value});
  }

  private _handleSubmitMemberNameForm(event: any) {
    event.preventDefault();

    const memberName = this.state.memberName.trim();
    const members = this.state.members;

    members.push({
      name: memberName,
    });

    this.setState({
      memberName: '',
      members,
    });
  }
}
