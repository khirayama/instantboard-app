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
import Icon from '../../components/icon';
import Link from '../../router/link';
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
      labelId: (props.params.id) ? Number(props.params.id) : null,
      labelName: '',
      memberName: '',
      memberNameErrorMessage: '',
      labelRequests: [],
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
        }).catch((result: any) => {
          const newLabel = result.label;
          const requests = result.requests;

          if (newLabel.id) {
            this.setState({
              labelId: newLabel.id,
              labelRequests: requests,
            });
          }
        });
      },
      updateLabel: (label: ILabelRequest) => {
        updateLabel(this.dispatch, label).then(() => {
          this.context.move('/labels');
        }).catch((result) => {
          const newLabel = result.label;
          const requests = result.requests;

          if (newLabel.id) {
            this.setState({
              labelId: newLabel.id,
              labelRequests: requests,
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
      for (const label of labels) {
        if (label.id === labelId) {
          this.setState({
            labelName: label.name,
            labelRequests: label.requests,
          });
          break;
        }
      }
    }
  }

  public render() {
    const labelId = this.state.labelId;
    const profile = this.state.profile || {};

    const filteredMembers = this.state.members.filter((member) => (member.name.indexOf(this.state.memberName) !== -1));

    return (
      <section className="page label-page">
        <form onSubmit={this.handleSubmitMemberNameForm}>
          <header className="label-page--header">
            <Link to="/labels"><Icon type="back"/></Link>
            <button><Icon type="send"/></button>
          </header>
          <div className="label-page--member-block">
            <Icon type="profile"/>
            <input
              type="text"
              value={this.state.memberName}
              onChange={this.handleChangeMemberNameInput}
              placeholder="Search by member name"
            />
            {(this.state.memberNameErrorMessage) ? <span>{this.state.memberNameErrorMessage}</span> : null}
          </div>
          <div>
            <ul>{this.state.labelRequests.filter((request) => {
              return (request.member.name !== profile.name);
            }).map((request, index) => <li key={index}>{request.member.name}</li>)}</ul>
          </div>
        </form>
        <form onSubmit={this.handleSubmitLabelForm}>
          <input
            autoFocus
            type="text"
            value={this.state.labelName}
            onChange={this.handleChangeNameInput}
            placeholder="Enter label name"
          />
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
    const requests = this.state.labelRequests;
    const id = this.state.labelId;

    if (labelName) {
      if (id === undefined || id === null) {
        this.actions.createLabel({
          name: labelName,
          requests,
        });
      } else {
        this.actions.updateLabel({
          id,
          name: labelName,
          requests,
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
        const labelRequests = this.state.labelRequests.concat();
        labelRequests.push({
          member: {
            name: memberName,
          },
        });
        this.setState({
          memberName: '',
          memberNameErrorMessage: '',
          labelRequests,
        });
      } else {
        this.setState({
          memberNameErrorMessage: `${memberName} is not existed.`,
        });
      }
    });
  }
}
