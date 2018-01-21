import * as Fuse from 'fuse.js';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { createLabel, fetchLabel, updateLabel } from '../../../action-creators/label';
import { fetchMember } from '../../../action-creators/member';
import { getUser } from '../../../action-creators/user';
import Link from '../../../router/link';
import { User } from '../../../services';
import Icon from '../../components/icon';
import Indicator from '../../components/indicator';
import SearchMemberListItem from '../../components/search-member-list-item';
import Container from '../container';

interface ITemporaryRequest {
  id: number | null;
  status: string;
  member: {
    id: number;
    name: string;
    email: string;
    imageUrl: string;
  };
}

interface ILableMobilePageState {
  labelId: number | null;
  labelName: string;
  keyword: string;
  keywordErrorMessage: string;
  labelRequests: ITemporaryRequest[];
  isMemberListShown: boolean;
  uiBlocking: boolean;
}

export default class LabelMobilePage extends Container<IContainerProps, ILableMobilePageState & IState> {
  public static contextTypes: { move: any } = {
    move: PropTypes.func,
  };

  private handleChangeNameInput: any;

  private handleSearchMemberListItemClick: any;

  private handleSubmitLabelForm: any;

  private handleChangeMemberNameInput: any;

  private handleFocusMemberNameInput: any;

  private handleSubmitMemberNameForm: any;

  private handleMemberListCloseButtonClick: any;

  constructor(props: IContainerProps) {
    super(props);

    const { params }: { params: { id: string } } = props;
    const initialState: ILableMobilePageState = {
      labelId: params.id ? Number(params.id) : null,
      labelName: '',
      keyword: '',
      keywordErrorMessage: '',
      labelRequests: [],
      isMemberListShown: false,
      uiBlocking: false,
    };

    this.state = Object.assign({}, this.getState(), initialState);

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
              labelRequests: label.requests.map(request => {
                return {
                  id: request.id,
                  status: request.status,
                  member: request.member,
                };
              }),
            });
            break;
          }
        }
      }
    });
  }

  public render() {
    const profile = this.state.profile;
    const ui = this.state.ui;
    const filteredMembers = this.filterMembers(this.state.members, this.state.keyword);

    return (
      <section className="page label-mobile-page">
        {this.state.uiBlocking ? <div className="ui-block" /> : null}
        <Indicator active={ui.isLoadingLabels} />
        <header className="label-mobile-page--header">
          <Link to="/labels">
            <Icon type="back" />
          </Link>
          <button type="submit" onClick={this.handleSubmitLabelForm}>
            <Icon type="send" />
          </button>
        </header>
        <form onSubmit={this.handleSubmitMemberNameForm}>
          <div className="label-mobile-page--member-block">
            <Icon type="profile" />
            <input
              type="text"
              value={this.state.keyword}
              onChange={this.handleChangeMemberNameInput}
              onFocus={this.handleFocusMemberNameInput}
              placeholder="Search by name or email"
            />
            {this.state.isMemberListShown ? (
              <div className="label-mobile-page--member-block--content">
                {this.state.keywordErrorMessage ? (
                  <span className="label-mobile-page--member-block--error">{this.state.keywordErrorMessage}</span>
                ) : null}
                <h2 className="label-mobile-page--member-block--header">
                  {'Members'}
                  <span onClick={this.handleMemberListCloseButtonClick}>
                    <Icon type="close" />
                  </span>
                </h2>
                {filteredMembers.length === 0 ? (
                  <div
                    className="label-mobile-page--member-block--content--no-result"
                    onClick={this.handleSubmitMemberNameForm}
                  >
                    <Icon type="profile" />
                    <p>{`Add ${this.state.keyword} as new member.`}</p>
                  </div>
                ) : (
                  <ul className="label-mobile-page--member-block--content--list">
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
        <ul className="label-mobile-page--member-list">
          {this.state.labelRequests
            .filter(request => {
              return profile !== null && request.member.id !== profile.id;
            })
            .map((request: ITemporaryRequest) => {
              const member = request.member;
              return (
                <li key={request.id || member.id}>
                  <img src={member.imageUrl} />
                  <p>{member.name}</p>
                  <span>
                    <Icon type="remove" />
                  </span>
                </li>
              );
            })}
        </ul>
        <form onSubmit={this.handleSubmitLabelForm}>
          <input
            type="text"
            className="label-mobile-page--label-name-input"
            autoFocus
            value={this.state.labelName}
            onChange={this.handleChangeNameInput}
            placeholder="Enter label name"
          />
        </form>
      </section>
    );
  }

  private filterMembers(members: IUser[], keyword: string): IUser[] {
    const options = {
      shouldSort: true,
      threshold: 0.55,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name', 'email'],
    };
    const fuse = new Fuse(members, options);
    const filteredMembers: IUser[] = fuse.search(keyword);
    return filteredMembers.length === 0 && keyword === '' ? members : filteredMembers;
  }

  private onUpdate(callback): void {
    callback();
  }

  // For member name input
  private _handleFocusMemberNameInput() {
    this.setState({ isMemberListShown: true });
  }

  private _handleChangeNameInput(event: any) {
    this.setState({ labelName: event.currentTarget.value });
  }

  private _handleChangeMemberNameInput(event: any) {
    this.setState({
      keyword: event.currentTarget.value,
      keywordErrorMessage: '',
    });
  }

  // For member form
  private _handleSubmitMemberNameForm(event: any) {
    event.preventDefault();

    const keyword = this.state.keyword.trim();

    User.search({ q: keyword }).then((users: any) => {
      if (users.length !== 0 && (users[0].name === keyword || users[0].email === keyword)) {
        const labelRequests = this.state.labelRequests;
        let isIncluded = false;
        labelRequests.forEach((labelRequest: any) => {
          if (labelRequest.member.name === keyword) {
            isIncluded = true;
          }
        });
        if (!isIncluded) {
          labelRequests.push({
            id: null,
            status: 'pending',
            member: users[0],
          });
          this.setState({
            keyword: '',
            keywordErrorMessage: '',
            labelRequests,
            isMemberListShown: false,
          });
        }
      } else {
        this.setState({
          keywordErrorMessage: `${keyword} is not existed.`,
        });
      }
    });
  }

  // For member list
  private _handleSearchMemberListItemClick(event: any, props: any) {
    const { member } = props;
    const labelRequests = this.state.labelRequests;
    let isIncluded = false;
    labelRequests.forEach((labelRequest: any) => {
      if (labelRequest.member.name === member.name) {
        isIncluded = true;
      }
    });
    if (!isIncluded) {
      labelRequests.push({
        id: null,
        status: 'pending',
        member,
      });
      this.setState({
        keyword: '',
        keywordErrorMessage: '',
        labelRequests,
        isMemberListShown: false,
      });
    }
  }

  private _handleMemberListCloseButtonClick() {
    this.setState({ isMemberListShown: false });
  }

  // For submit label
  private _handleSubmitLabelForm(event: any) {
    event.preventDefault();
    this.submitLabel();
  }

  private submitLabel() {
    const labelName = this.state.labelName.trim();
    const requests = this.state.labelRequests;
    const id = this.state.labelId;

    if (labelName && !this.state.uiBlocking) {
      this.setState({ uiBlocking: true });

      if (id === undefined || id === null) {
        this.actions
          .createLabel({
            name: labelName,
            requests,
          })
          .then(() => {
            this.context.move('/labels');
          })
          .catch((result: any) => {
            if (result.label.id) {
              this.setState({
                labelId: result.label.id,
                labelRequests: result.requests,
                uiBlocking: false,
              });
            }
          });
      } else {
        this.actions
          .updateLabel({
            id,
            name: labelName,
            requests,
          })
          .then(() => {
            this.context.move('/labels');
          })
          .catch((result: any) => {
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
