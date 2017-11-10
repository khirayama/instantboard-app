import * as PropTypes from 'prop-types';
import * as React from 'react';
import Link from '../../../router/link';
import {User} from '../../../services';
import Icon from '../../components/icon';
import Indicator from '../../components/indicator';
import SearchMemberListItem from '../../components/search-member-list-item';

export default class LabelPage extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleChangeNameTextarea: any;

  private handleKeyDownNameTextarea: any;

  private handleSubmitLabelForm: any;

  private handleChangeMemberNameInput: any;

  private handleFocusMemberNameInput: any;

  private handleBlurMemberNameInput: any;

  private handleSubmitMemberNameForm: any;

  constructor(props: any) {
    super(props);

    this.state = {
      labelId: (props.params.id) ? Number(props.params.id) : null,
      labelName: '',
      memberName: '',
      memberNameErrorMessage: '',
      labelRequests: [],
      isMemberListShown: false,
      uiBlocking: false,
    };

    this.handleChangeNameTextarea = this._handleChangeNameTextarea.bind(this);
    this.handleKeyDownNameTextarea = this._handleKeyDownNameTextarea.bind(this);
    this.handleSubmitLabelForm = this._handleSubmitLabelForm.bind(this);
    this.handleChangeMemberNameInput = this._handleChangeMemberNameInput.bind(this);
    this.handleFocusMemberNameInput = this._handleFocusMemberNameInput.bind(this);
    this.handleBlurMemberNameInput = this._handleBlurMemberNameInput.bind(this);
    this.handleSubmitMemberNameForm = this._handleSubmitMemberNameForm.bind(this);
  }

  public componentDidMount() {
    this.props.actions.getUser();
    this.props.actions.fetchLabel();
    this.props.actions.fetchMember();
  }

  public componentDidUpdate(prevProps) {
    const ui = this.props.ui;
    const prevUi = prevProps.ui;
    const labels = this.props.labels;
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
    const profile = this.props.profile || {};
    const ui = this.props.ui;
    const labelId = this.state.labelId;

    const filteredMembers = this.props.members.filter((member) => (member.name.indexOf(this.state.memberName) !== -1));

    return (
      <section className="page label-page">
        {(this.state.uiBlocking) ? <div className="ui-block" /> : null}
        <Indicator active={(ui.isLoadingLabels)}/>
        <header className="label-page--header">
          <Link to="/labels"><Icon type="back"/></Link>
          <button onClick={this.handleSubmitLabelForm}><Icon type="send"/></button>
        </header>
        <form onSubmit={this.handleSubmitMemberNameForm}>
          <div className="label-page--member-block">
            <Icon type="profile"/>
            <input
              type="text"
              value={this.state.memberName}
              onChange={this.handleChangeMemberNameInput}
              onFocus={this.handleFocusMemberNameInput}
              onBlur={this.handleBlurMemberNameInput}
              placeholder="Search by member name"
            />
            {(this.state.isMemberListShown) ? (
              <div className="label-page--member-block--content">
                {(this.state.memberNameErrorMessage) ? (
                  <span className="label-page--member-block--error">{this.state.memberNameErrorMessage}</span>
                ) : null}
                <h2>Members</h2>
                {(filteredMembers.length !== 0) ? (
                  <ul className="member-block--list">
                    {filteredMembers.map((member) => {
                      return (
                        <SearchMemberListItem
                          key={member.id}
                          member={member}
                          actions={this.props.actions}
                        />
                      );
                    })}
                  </ul>
                ) : (
                  <div
                    className="label-page--member-block--content--no-result"
                    onTouchStart={this.handleSubmitMemberNameForm}
                    onMouseDown={this.handleSubmitMemberNameForm}
                  >
                    Add {this.state.memberName} as new member.
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </form>
        <ul className="label-page--member-list">
          {this.state.labelRequests.filter((request) => {
            return (request.member.name !== profile.name);
          }).map((request, index) => {
            return (
              <li key={index}>
                {request.member.name}
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.handleSubmitLabelForm}>
          <textarea
            className="label-page--label-name-textarea"
            autoFocus
            rows={16}
            value={this.state.labelName}
            onChange={this.handleChangeNameTextarea}
            onKeyDown={this.handleKeyDownNameTextarea}
            placeholder="Enter label name"
          />
        </form>
      </section>
    );
  }

  private _handleChangeNameTextarea(event: any) {
    this.setState({labelName: event.currentTarget.value});
  }

  private _handleKeyDownNameTextarea(event: any) {
    const ENTER_KEY_CODE = 13;

    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      this.submitLabel();
    }
  }

  private _handleSubmitLabelForm(event: any) {
    event.preventDefault();
    this.submitLabel();
  }

  private _handleChangeMemberNameInput(event: any) {
    this.setState({
      memberName: event.currentTarget.value,
      memberNameErrorMessage: '',
    });
  }

  private _handleFocusMemberNameInput(event: any) {
    this.setState({isMemberListShown: true});
  }

  private _handleBlurMemberNameInput(event: any) {
    this.setState({
      memberName: '',
      isMemberListShown: false,
    });
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
          isMemberListShown: false,
        });
      } else {
        this.setState({
          memberNameErrorMessage: `${memberName} is not existed.`,
        });
      }
    });
  }

  private submitLabel() {
    const labelName = this.state.labelName.trim();
    const requests = this.state.labelRequests;
    const id = this.state.labelId;

    if (labelName && !this.state.uiBlocking) {
      this.setState({uiBlocking: true});

      if (id === undefined || id === null) {
        this.props.actions.createLabel({
          name: labelName,
          requests,
        }).then(() => {
          this.context.move('/labels');
        }).catch((result: any) => {
          if (result.label.id) {
            this.setState({
              labelId: result.label.id,
              labelRequests: result.requests,
              uiBlocking: false,
            });
          }
        });
      } else {
        this.props.actions.updateLabel({
          id,
          name: labelName,
          requests,
        }).then(() => {
          this.context.move('/labels');
        }).catch((result: any) => {
          if (result.label.id) {
            this.setState({
              labelId: result.label.id,
              labelRequests: result.requests,
            });
          }
        });
      }
    }
  }
}
