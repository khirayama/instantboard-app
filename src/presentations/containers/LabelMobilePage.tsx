import * as Fuse from 'fuse.js';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { createLabel, fetchLabel, updateLabel } from 'action-creators/label';
import { createRequest, destroyRequest } from 'action-creators/request';
import { fetchMember, getUser } from 'action-creators/user';
import User from 'services/User';
import Link from 'router/Link';
import Icon from 'presentations/components/Icon';
import Indicator from 'presentations/components/Indicator';
import SearchMemberListItem from 'presentations/components/SearchMemberListItem';
import Container from 'presentations/containers/Container';

function MemberListItem(props: any) {
  const { labelMember, onRemoveButtonClick } = props;
  const handleRemoveButtonClick = () => {
    if (onRemoveButtonClick) {
      onRemoveButtonClick(event, props, null);
    }
  };

  return (
    <li>
      <img src={labelMember.imageUrl} />
      <p>{labelMember.name}</p>
      <span onClick={handleRemoveButtonClick}>
        <Icon type='remove' />
      </span>
    </li>
  );
}

interface ITemporaryLabelMember {
  id: number;
  name: string;
  imageUrl: string;
  status: string;
  requestId: number | null;
}

interface ILableMobilePageState {
  labelId: number | null;
  labelName: string;
  keyword: string;
  keywordErrorMessage: string;
  labelMembers: ITemporaryLabelMember[];
  isMemberListShown: boolean;
  isInitialized: boolean;
  uiBlocking: boolean;
}

export default class LabelMobilePage extends Container<IContainerProps, ILableMobilePageState & IState> {
  public static contextTypes: { move: any } = {
    move: PropTypes.func
  };

  private handleChangeNameInput: any;

  private handleSearchMemberListItemClick: any;

  private handleSubmitLabelForm: any;

  private handleChangeMemberNameInput: any;

  private handleFocusMemberNameInput: any;

  private handleSubmitMemberNameForm: any;

  private handleMemberListCloseButtonClick: any;

  private handleMemberListRemoveButtonClick: any;

  constructor(props: IContainerProps) {
    super(props);

    const { params }: { params: { id: string } } = props;
    const initialState: ILableMobilePageState = {
      labelId: params.id ? Number(params.id) : null,
      labelName: '',
      keyword: '',
      keywordErrorMessage: '',
      labelMembers: [],
      isMemberListShown: false,
      isInitialized: false,
      uiBlocking: false
    };

    this.state = {...this.getState(), ...initialState};

    this.actions = {
      fetchMember: () => {
        return fetchMember(this.dispatch);
      },
      fetchLabel: () => {
        return fetchLabel(this.dispatch);
      },
      createLabel: (label: { name: string; members: ITemporaryLabelMember[] }) => {
        return createLabel(this.dispatch, label);
      },
      createRequest: (params: { labelId: number; memberId: number }) => {
        return createRequest(this.dispatch, params);
      },
      destroyRequest: (params: { id: number }) => {
        return destroyRequest(this.dispatch, params);
      },
      updateLabel: (label: ILabel) => {
        return updateLabel(this.dispatch, label);
      },
      getUser: () => {
        return getUser(this.dispatch);
      }
    };

    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleSearchMemberListItemClick = this._handleSearchMemberListItemClick.bind(this);
    this.handleSubmitLabelForm = this._handleSubmitLabelForm.bind(this);
    this.handleChangeMemberNameInput = this._handleChangeMemberNameInput.bind(this);
    this.handleFocusMemberNameInput = this._handleFocusMemberNameInput.bind(this);
    this.handleSubmitMemberNameForm = this._handleSubmitMemberNameForm.bind(this);
    this.handleMemberListCloseButtonClick = this._handleMemberListCloseButtonClick.bind(this);
    this.handleMemberListRemoveButtonClick = this._handleMemberListRemoveButtonClick.bind(this);
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

      if (
        !this.state.isInitialized &&
        prevUi.isLoadingLabels &&
        !ui.isLoadingLabels &&
        labels.length !== 0 &&
        labelId
      ) {
        for (const label of labels) {
          if (label.id === labelId) {
            this.setState({
              labelName: label.name,
              labelMembers: label.members,
              isInitialized: true
            });
            break;
          }
        }
      }
    });
  }

  public render() {
    const ui = this.state.ui;
    const profile = this.state.profile;
    const filteredMembers = this.filterMembers(this.state.members, this.state.keyword);

    return (
      <section className='page label-mobile-page'>
        {this.state.uiBlocking ? <div className='ui-block' /> : null}
        <Indicator active={ui.isLoadingLabels} />
        <header className='label-mobile-page--header'>
          <Link to='/labels'>
            <Icon type='back' />
          </Link>
          <button type='submit' onClick={this.handleSubmitLabelForm}>
            <Icon type='send' />
          </button>
        </header>
        <form onSubmit={this.handleSubmitMemberNameForm}>
          <div className='label-mobile-page--member-block'>
            <Icon type='profile' />
            <input
              type='text'
              value={this.state.keyword}
              onChange={this.handleChangeMemberNameInput}
              onFocus={this.handleFocusMemberNameInput}
              placeholder='Search by name or email'
            />
            {this.state.isMemberListShown ? (
              <div className='label-mobile-page--member-block--content'>
                {this.state.keywordErrorMessage ? (
                  <span className='label-mobile-page--member-block--error'>{this.state.keywordErrorMessage}</span>
                ) : null}
                <h2 className='label-mobile-page--member-block--header'>
                  {'Members'}
                  <span onClick={this.handleMemberListCloseButtonClick}>
                    <Icon type='close' />
                  </span>
                </h2>
                {filteredMembers.length === 0 ? (
                  <div
                    className='label-mobile-page--member-block--content--no-result'
                    onClick={this.handleSubmitMemberNameForm}
                  >
                    <Icon type='profile' />
                    <p>{`Add ${this.state.keyword} as new member.`}</p>
                  </div>
                ) : (
                  <ul className='label-mobile-page--member-block--content--list'>
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
        <ul className='label-mobile-page--member-list'>
          {this.state.labelMembers
            .filter((labelMember: ITemporaryLabelMember): boolean => {
              return profile !== null && labelMember.id !== profile.id;
            })
            .map((temporaryLabelMember: ITemporaryLabelMember) => {
              return (
                <MemberListItem
                  key={temporaryLabelMember.id}
                  labelMember={temporaryLabelMember}
                  onRemoveButtonClick={this.handleMemberListRemoveButtonClick}
                />
              );
            })}
        </ul>
        <form onSubmit={this.handleSubmitLabelForm}>
          <input
            type='text'
            className='label-mobile-page--label-name-input'
            autoFocus
            value={this.state.labelName}
            onChange={this.handleChangeNameInput}
            placeholder='Enter label name'
          />
        </form>
      </section>
    );
  }

  private filterMembers(members: IMember[], keyword: string): IMember[] {
    const options = {
      shouldSort: true,
      threshold: 0.55,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name']
    };
    const fuse = new Fuse(members, options);
    const filteredMembers: IMember[] = fuse.search(keyword);
    return filteredMembers.length === 0 && keyword === '' ? members : filteredMembers;
  }

  private onUpdate(callback): void {
    callback();
  }

  // For member name input
  private _handleFocusMemberNameInput() {
    this.setState({ isMemberListShown: true });
  }

  private _handleChangeNameInput(event: React.KeyboardEvent<HTMLInputElement>) {
    this.setState({ labelName: event.currentTarget.value });
  }

  private _handleChangeMemberNameInput(event: React.KeyboardEvent<HTMLInputElement>) {
    this.setState({
      keyword: event.currentTarget.value,
      keywordErrorMessage: ''
    });
  }

  // For member form
  private _handleSubmitMemberNameForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const keyword = this.state.keyword.trim();

    User.search({ q: keyword }).then((users: IMember[]) => {
      if ((users.length !== 0 && users[0].name === keyword) || users.length === 1) {
        let isIncluded: boolean = false;
        const labelMembers: ITemporaryLabelMember[] = this.state.labelMembers.map(
          (labelMember: ITemporaryLabelMember) => {
            if (labelMember.name === keyword || users.length === 1) {
              isIncluded = true;
            }
            return labelMember;
          }
        );
        if (!isIncluded) {
          labelMembers.push({
            id: users[0].id,
            name: users[0].name,
            imageUrl: users[0].imageUrl,
            status: 'pending',
            requestId: null
          });
          this.setState({
            keyword: '',
            keywordErrorMessage: '',
            labelMembers,
            isMemberListShown: false
          });
        }
      } else if (keyword) {
        this.setState({
          keywordErrorMessage: `${keyword} is not existed.`
        });
      }
    });
  }

  // For member list
  private _handleSearchMemberListItemClick(event: any, props: any) {
    const { member } = props;
    let isIncluded: boolean = false;
    const labelMembers: ITemporaryLabelMember[] = this.state.labelMembers.map((labelMember: ITemporaryLabelMember) => {
      if (labelMember.name === member.name) {
        isIncluded = true;
      }
      return labelMember;
    });
    if (!isIncluded) {
      labelMembers.push({
        id: member.id,
        name: member.name,
        imageUrl: member.imageUrl,
        status: 'pending',
        requestId: null
      });
      this.setState({
        keyword: '',
        keywordErrorMessage: '',
        labelMembers,
        isMemberListShown: false
      });
    }
  }

  private _handleMemberListCloseButtonClick() {
    this.setState({ isMemberListShown: false });
  }

  private _handleMemberListRemoveButtonClick(event, props) {
    // FIXME: react/no-access-state-in-setstate bug?
    /* eslint-disable react/no-access-state-in-setstate */
    const labelMembers = this.state.labelMembers.filter((temporaryLabelMember: ITemporaryLabelMember): boolean => {
      return props.labelMember.id !== temporaryLabelMember.id;
    });
    this.setState({ labelMembers });
    /* eslint-enable react/no-access-state-in-setstate */
  }

  // For submit label
  private _handleSubmitLabelForm(event: any) {
    event.preventDefault();
    this.submitLabel();
  }

  private submitLabel() {
    const labelName = this.state.labelName.trim();
    const labelMembers = this.state.labelMembers;
    const id = this.state.labelId;

    if (labelName && !this.state.uiBlocking) {
      this.setState({ uiBlocking: true });

      if (id === undefined || id === null) {
        this.actions
          .createLabel({ name: labelName })
          .then(({ payload }) => {
            const label = payload.label;
            Promise.all(
              labelMembers.map((labelMember: ITemporaryLabelMember) => {
                return this.actions.createRequest({
                  labelId: label.id,
                  memberId: labelMember.id
                });
              })
            ).then(() => {
              this.context.move('/labels');
            });
          })
          .catch((result: any) => {
            if (result.label.id) {
              this.setState({
                labelId: result.label.id,
                labelMembers: result.members,
                uiBlocking: false
              });
            }
          });
      } else {
        this.actions
          .updateLabel({ id, name: labelName })
          .then(({ payload }) => {
            const label = payload.label;
            const addedLabelMembers = this.state.labelMembers.filter(
              (currentLabelMember: ITemporaryLabelMember): boolean => {
                for (const originLabelMember of label.members) {
                  if (currentLabelMember.id === originLabelMember.id) {
                    return false;
                  }
                }
                return true;
              }
            );
            const removedLabelMembers = label.members.filter((originLabelMember: ILabelMember): boolean => {
              for (const currentLabelMember of this.state.labelMembers) {
                if (currentLabelMember.id === originLabelMember.id) {
                  return false;
                }
              }
              return true;
            });
            Promise.all([
              Promise.all(
                addedLabelMembers.map((labelMember: ITemporaryLabelMember) => {
                  return this.actions.createRequest({
                    labelId: label.id,
                    memberId: labelMember.id
                  });
                })
              ),
              Promise.all(
                removedLabelMembers.map((labelMember: ITemporaryLabelMember) => {
                  return this.actions.destroyRequest({
                    id: labelMember.requestId
                  });
                })
              )
            ]).then(() => {
              this.context.move('/labels');
            });
          })
          .catch((result: any) => {
            if (result.label.id) {
              this.setState({
                labelId: result.label.id,
                labelMembers: result.requests
              });
            }
          });
      }
    }
  }
}
