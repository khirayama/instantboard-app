import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  createLabel,
  fetchLabel,
  updateLabel,
} from '../../action-creators/label';
import {
  fetchMember,
} from '../../action-creators/member';
import {
  getUser,
} from '../../action-creators/user';
import {User} from '../../services';
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
      labelId: props.params.id,
      labelName: '',
      memberName: '',
      memberNameErrorMessage: '',
      labelMembers: [],
    });

    this.actions = {
      fetchMember: () => {
        fetchMember(this.dispatch);
      },
      fetchLabel: () => {
        fetchLabel(this.dispatch);
      },
      createLabel: (label: ILabelRequest) => {
        createLabel(this.dispatch, label).then((action) => {
          this.context.move('/labels');
        }).catch((result) => {
          const label = result.label;
          const members = result.members;

          if (label.id) {
            this.setState({
              labelId: label.id,
              labelMembers: members,
            });
          }
        });
      },
      updateLabel: (label: ILabelRequest) => {
        updateLabel(this.dispatch, label).then(() => {
          this.context.move('/labels');
        }).catch((result) => {
          const label = result.label;
          const members = result.members;

          if (label.id) {
            this.setState({
              labelId: label.id,
              labelMembers: members,
            });
          }
        });
      },
      getUser: () => {
        getUser(this.dispatch);
      },
    };

    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleSubmitLabelForm = this._handleSubmitLabelForm.bind(this);
    this.handleChangeMemberNameInput = this._handleChangeMemberNameInput.bind(this);
    this.handleSubmitMemberNameForm = this._handleSubmitMemberNameForm.bind(this);
  }

  public componentDidMount() {
    this.actions.getUser();
    this.actions.fetchLabel();
    this.actions.fetchMember();
  }

  public componentDidUpdate(prevProps, prevState) {
    const ui = this.state.ui;
    const prevUi = prevState.ui;
    const labels = this.state.labels;
    const labelId = this.state.labelId;

    if (prevUi.isLoadingLabels && !ui.isLoadingLabels && labels.length !== 0 && labelId) {
      for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        if (label.id === labelId) {
          this.setState({
            labelName: label.name,
            labelMembers: label.members,
          });
          break;
        }
      }
    }
  }

  public render() {
    const labelId = this.state.labelId;
    const profile = this.state.profile || {};

    return (
      <section className="page label-page">
        <form onSubmit={this.handleSubmitMemberNameForm}>
          <input type="text" value={this.state.memberName} onChange={this.handleChangeMemberNameInput} />
          {(this.state.memberNameErrorMessage) ? <span>{this.state.memberNameErrorMessage}</span> : null}
          <ul>{this.state.labelMembers.filter((member) => member.name !== profile.name).map((member, index) => <li key={index}>{member.name}</li>)}</ul>
        </form>
        <form onSubmit={this.handleSubmitLabelForm}>
          <input type="text" autoFocus value={this.state.labelName} onChange={this.handleChangeNameInput} />
          <button>{(labelId) ? 'Update!' : 'Create!'}</button>
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
    const members = this.state.labelMembers;
    const id = this.state.labelId;

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

    User.search({name: memberName}).then((users: any) => {
      if (users.length && users[0].name === memberName) {
        const labelMembers = this.state.labelMembers.concat();
        labelMembers.push({
          name: memberName,
        });
        this.setState({
          memberName: '',
          memberNameErrorMessage: '',
          labelMembers,
        });
      } else {
        this.setState({
          memberNameErrorMessage: `${memberName} is not existed.`,
        });
      }
    });
  }
}
