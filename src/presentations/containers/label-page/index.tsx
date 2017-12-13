import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  createLabel,
  fetchLabel,
  updateLabel,
} from '../../../action-creators/label';
import {
  fetchMember,
} from '../../../action-creators/member';
import {
  getUser,
} from '../../../action-creators/user';
import Link from '../../../router/link';
import {
  User,
} from '../../../services';
import Icon from '../../components/icon';
import Indicator from '../../components/indicator';
import SearchMemberListItem from '../../components/search-member-list-item';
import Container from '../container';

export default class LabelPage extends Container<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleChangeNameInput: any;

  private handleKeyDownNameInput: any;

  private handleSearchMemberListItemClick: any;

  private handleSubmitLabelForm: any;

  private handleChangeMemberNameInput: any;

  private handleFocusMemberNameInput: any;

  private handleSubmitMemberNameForm: any;

  private handleMemberListCloseButtonClick: any;

  constructor(props: any) {
    super(props);

    const initialState = {
      labelId: (props.params.id) ? Number(props.params.id) : null,
      labelName: '',
      memberName: '',
      memberNameErrorMessage: '',
      labelRequests: [],
      isMemberListShown: false,
      uiBlocking: false,
    };

    this.state = Object.assign({}, this.state, initialState);

    this.actions = {
      fetchMember: () => {
        return fetchMember(this.dispatch);
      },
      fetchLabel: () => {
        return fetchLabel(this.dispatch);
      },
      createLabel: (label: ILabelRequest) => {
        return createLabel(this.dispatch, label);
      },
      updateLabel: (label: ILabelRequest) => {
        return updateLabel(this.dispatch, label);
      },
      getUser: () => {
        return getUser(this.dispatch);
      },
    };

    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleKeyDownNameInput = this._handleKeyDownNameInput.bind(this);
    this.handleSearchMemberListItemClick = this._handleSearchMemberListItemClick.bind(this);
    this.handleSubmitLabelForm = this._handleSubmitLabelForm.bind(this);
    this.handleChangeMemberNameInput = this._handleChangeMemberNameInput.bind(this);
    this.handleFocusMemberNameInput = this._handleFocusMemberNameInput.bind(this);
    this.handleSubmitMemberNameForm = this._handleSubmitMemberNameForm.bind(this);
    this.handleMemberListCloseButtonClick = this._handleMemberListCloseButtonClick.bind(this);
  }

  public componentDidMount() {
    this.actions.getUser();
    this.actions.fetchLabel();
    this.actions.fetchMember();
  }

  public componentDidUpdate(prevProps, prevState) {
    this.onUpdate(() => {
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
    });
  }

  public render() {
    const profile = this.state.profile || {};
    const ui = this.state.ui;

    const filteredMembers = this.state.members.filter(member => (member.name.indexOf(this.state.memberName) !== -1));

    return (
      <section className="page label-page">
        {(this.state.uiBlocking) ? <div className="ui-block"/> : null}
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
              placeholder="Search by member name"
            />
            {(this.state.isMemberListShown) ? (
              <div className="label-page--member-block--content">
                {(this.state.memberNameErrorMessage) ? (
                  <span className="label-page--member-block--error">{this.state.memberNameErrorMessage}</span>
                ) : null}
                <h2 className="label-page--member-block--header">Members
                  <span onClick={this.handleMemberListCloseButtonClick}><Icon type="close"/></span>
                </h2>
                {(filteredMembers.length === 0) ? (
                  <div
                    className="label-page--member-block--content--no-result"
                    onClick={this.handleSubmitMemberNameForm}
                  >
                    Add {this.state.memberName} as new member.
                  </div>
                ) : (
                  <ul className="member-block--list">
                    {filteredMembers.map(member => {
                      return (
                        <SearchMemberListItem
                          key={member.id}
                          member={member}
                          onClick={this.handleSearchMemberListItemClick}
                        />
                      );
                    })}
                  </ul>
                )}
              </div>
            ) : null}
          </div>
        </form>
        <ul className="label-page--member-list">
          {this.state.labelRequests.filter(request => {
            return (request.member.name !== profile.name);
          }).map((request: IRequest) => {
            return (
              <li key={request.id || request.member.id}>{request.member.name}</li>
            );
          })}
        </ul>
        <form onSubmit={this.handleSubmitLabelForm}>
          <input
            type="text"
            className="label-page--label-name-input"
            autoFocus
            value={this.state.labelName}
            onChange={this.handleChangeNameInput}
            onKeyDown={this.handleKeyDownNameInput}
            placeholder="Enter label name"
          />
        </form>
      </section>
    );
  }

  private onUpdate(callback): void {
    callback();
  }

  private _handleChangeNameInput(event: any) {
    this.setState({labelName: event.currentTarget.value});
  }

  private _handleKeyDownNameInput(event: any) {
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

  private _handleFocusMemberNameInput() {
    this.setState({isMemberListShown: true});
  }

  private _handleSearchMemberListItemClick(event: any, props: any) {
    const labelRequests = this.state.labelRequests.concat();
    let isIncluded = false;
    labelRequests.forEach((labelRequest: any) => {
      if (labelRequest.member.name === props.member.name) {
        isIncluded = true;
      }
    });
    if (!isIncluded) {
      labelRequests.push({
        member: props.member,
      });
      this.setState({
        memberName: '',
        memberNameErrorMessage: '',
        labelRequests,
        isMemberListShown: false,
      });
    }
  }

  private _handleSubmitMemberNameForm(event: any) {
    event.preventDefault();

    const memberName = this.state.memberName.trim();

    User.search({name: memberName}).then((users: any) => {
      if (users.length && users[0].name === memberName) {
        const labelRequests = this.state.labelRequests.concat();
        let isIncluded = false;
        labelRequests.forEach((labelRequest: any) => {
          if (labelRequest.member.name === memberName) {
            isIncluded = true;
          }
        });
        if (!isIncluded) {
          labelRequests.push({
            member: memberName,
          });
          this.setState({
            memberName: '',
            memberNameErrorMessage: '',
            labelRequests,
            isMemberListShown: false,
          });
        }
      } else {
        this.setState({
          memberNameErrorMessage: `${memberName} is not existed.`,
        });
      }
    });
  }

  private _handleMemberListCloseButtonClick() {
    this.setState({isMemberListShown: false});
  }

  private submitLabel() {
    const labelName = this.state.labelName.trim();
    const requests = this.state.labelRequests;
    const id = this.state.labelId;

    if (labelName && !this.state.uiBlocking) {
      this.setState({uiBlocking: true});

      if (id === undefined || id === null) {
        this.actions.createLabel({
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
        this.actions.updateLabel({
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
