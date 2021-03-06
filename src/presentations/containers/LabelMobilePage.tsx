import * as React from 'react';

import { createLabel, fetchLabel, updateLabel } from 'action-creators/label';
import { createRequest, destroyRequest } from 'action-creators/request';
import { fetchMember, getUser } from 'action-creators/user';
import { Icon } from 'presentations/components/Icon';
import { Img } from 'presentations/components/Img';
import { Indicator } from 'presentations/components/Indicator';
import { SearchMemberListItem } from 'presentations/components/SearchMemberListItem';
import { Container, IContainerProps } from 'presentations/containers/Container';
import { Link } from 'router/Link';
import { context } from 'router/Navigator';
import { userService } from 'services/userService';

// tslint:disable-next-line:variable-name
const MemberListItem: any = (props: any): JSX.Element => {
  const { labelMember, onRemoveButtonClick } = props;
  const handleRemoveButtonClick: () => void = (): void => {
    if (onRemoveButtonClick) {
      onRemoveButtonClick(event, props, null);
    }
  };

  return (
    <li>
      <Img src={labelMember.imageUrl} alt={labelMember.name} />
      <p>{labelMember.name}</p>
      <span role="button" onClick={handleRemoveButtonClick}>
        <Icon type="remove" />
      </span>
    </li>
  );
};

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

export class LabelMobilePage extends Container<IContainerProps, ILableMobilePageState & IState> {
  private move: any;

  private onChangeNameInput: any;

  private onSearchMemberListItemClick: any;

  private onSubmitLabelForm: any;

  private onChangeMemberNameInput: any;

  private onFocusMemberNameInput: any;

  private onSubmitMemberNameForm: any;

  private onMemberListCloseButtonClick: any;

  private onMemberListRemoveButtonClick: any;

  constructor(props: IContainerProps) {
    super(props);

    const id: string = props.params.id;
    const initialState: ILableMobilePageState = {
      labelId: id ? Number(id) : null,
      labelName: '',
      keyword: '',
      keywordErrorMessage: '',
      labelMembers: [],
      isMemberListShown: false,
      isInitialized: false,
      uiBlocking: false,
    };

    this.state = { ...this.getState(), ...initialState };

    this.actions = {
      fetchMember: (): Promise<IAction> => {
        return fetchMember(this.dispatch);
      },
      fetchLabel: (): Promise<IAction> => {
        return fetchLabel(this.dispatch);
      },
      createLabel: (label: { name: string; members: ITemporaryLabelMember[] }): Promise<IAction> => {
        return createLabel(this.dispatch, label);
      },
      createRequest: (params: { labelId: number; memberId: number }): Promise<IAction> => {
        return createRequest(this.dispatch, params);
      },
      destroyRequest: (params: { id: number }): Promise<IAction> => {
        return destroyRequest(this.dispatch, params);
      },
      updateLabel: (label: ILabel): Promise<IAction> => {
        return updateLabel(this.dispatch, label);
      },
      getUser: (): Promise<IAction> => {
        return getUser(this.dispatch);
      },
    };

    this.onChangeNameInput = this.handleChangeNameInput.bind(this);
    this.onSearchMemberListItemClick = this.handleSearchMemberListItemClick.bind(this);
    this.onSubmitLabelForm = this.handleSubmitLabelForm.bind(this);
    this.onChangeMemberNameInput = this.handleChangeMemberNameInput.bind(this);
    this.onFocusMemberNameInput = this.handleFocusMemberNameInput.bind(this);
    this.onSubmitMemberNameForm = this.handleSubmitMemberNameForm.bind(this);
    this.onMemberListCloseButtonClick = this.handleMemberListCloseButtonClick.bind(this);
    this.onMemberListRemoveButtonClick = this.handleMemberListRemoveButtonClick.bind(this);
  }

  public componentDidMount(): void {
    this.actions.getUser();
    this.actions.fetchLabel();
    this.actions.fetchMember();
  }

  public componentDidUpdate(prevProps: IContainerProps, prevState: ILableMobilePageState & IState): void {
    this.onUpdate(() => {
      const ui: IUI = this.state.ui;
      const prevUi: IUI = prevState.ui;
      const labels: ILabel[] = this.state.labels;
      const labelId: number | null = this.state.labelId;

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
              isInitialized: true,
            });
            break;
          }
        }
      }
    });
  }

  public render(): JSX.Element {
    const ui: IUI = this.state.ui;
    const profile: IUser | null = this.state.profile;
    const filteredMembers: IMember[] = this.filterMembers(this.state.members, this.state.keyword);

    return (
      <section className="page label-mobile-page">
        <context.Consumer>{this.bindContext.bind(this)}</context.Consumer>
        {this.state.uiBlocking ? <div className="ui-block" /> : null}
        <Indicator active={ui.isLoadingLabels} />
        <header className="label-mobile-page--header">
          <Link to="/labels">
            <Icon type="back" />
          </Link>
          <button type="submit" onClick={this.onSubmitLabelForm}>
            <Icon type="send" />
          </button>
        </header>
        <form onSubmit={this.onSubmitMemberNameForm}>
          <div className="label-mobile-page--member-block">
            <Icon type="profile" />
            <input
              type="text"
              value={this.state.keyword}
              onChange={this.onChangeMemberNameInput}
              onFocus={this.onFocusMemberNameInput}
              placeholder="Search by name or email"
            />
            {this.state.isMemberListShown ? (
              <div className="label-mobile-page--member-block--content">
                {this.state.keywordErrorMessage ? (
                  <span className="label-mobile-page--member-block--error">{this.state.keywordErrorMessage}</span>
                ) : null}
                <h2 className="label-mobile-page--member-block--header">
                  {'Members'}
                  <span role="button" onClick={this.onMemberListCloseButtonClick}>
                    <Icon type="close" />
                  </span>
                </h2>
                {filteredMembers.length === 0 ? (
                  <div
                    role="button"
                    className="label-mobile-page--member-block--content--no-result"
                    onClick={this.onSubmitMemberNameForm}
                  >
                    <Icon type="profile" />
                    <p>{`Add ${this.state.keyword} as new member.`}</p>
                  </div>
                ) : (
                  <ul className="label-mobile-page--member-block--content--list">
                    {filteredMembers.map((member: IMember) => {
                      return (
                        <SearchMemberListItem
                          key={member.id}
                          member={member}
                          onClick={this.onSearchMemberListItemClick}
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
          {this.state.labelMembers
            .filter((labelMember: ITemporaryLabelMember): boolean => {
              return profile !== null && labelMember.id !== profile.id;
            })
            .map((temporaryLabelMember: ITemporaryLabelMember) => {
              return (
                <MemberListItem
                  key={temporaryLabelMember.id}
                  labelMember={temporaryLabelMember}
                  onRemoveButtonClick={this.onMemberListRemoveButtonClick}
                />
              );
            })}
        </ul>
        <form onSubmit={this.onSubmitLabelForm}>
          <input
            type="text"
            className="label-mobile-page--label-name-input"
            autoFocus
            value={this.state.labelName}
            onChange={this.onChangeNameInput}
            placeholder="Enter label name"
          />
        </form>
      </section>
    );
  }

  private bindContext(ctx: any): null {
    this.move = ctx.move;

    return null;
  }

  private filterMembers(members: IMember[], keyword: string): IMember[] {
    const filteredMembers: IMember[] = members.filter((member: IMember) => {
      return member.name.indexOf(keyword) !== -1;
    });

    return filteredMembers.length === 0 && keyword === '' ? members : filteredMembers;
  }

  private onUpdate(callback: any): void {
    callback();
  }

  // For member name input
  private handleFocusMemberNameInput(): void {
    this.setState({ isMemberListShown: true });
  }

  private handleChangeNameInput(event: React.KeyboardEvent<HTMLInputElement>): void {
    this.setState({ labelName: event.currentTarget.value });
  }

  private handleChangeMemberNameInput(event: React.KeyboardEvent<HTMLInputElement>): void {
    this.setState({
      keyword: event.currentTarget.value,
      keywordErrorMessage: '',
    });
  }

  // For member form
  private handleSubmitMemberNameForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const keyword: string = this.state.keyword.trim();

    userService.search({ q: keyword }).then((users: IMember[]) => {
      if ((users.length !== 0 && users[0].name === keyword) || users.length === 1) {
        let isIncluded: boolean = false;
        const labelMembers: ITemporaryLabelMember[] = this.state.labelMembers.map(
          (labelMember: ITemporaryLabelMember) => {
            if (labelMember.name === keyword || users.length === 1) {
              isIncluded = true;
            }

            return labelMember;
          },
        );
        if (!isIncluded) {
          labelMembers.push({
            id: users[0].id,
            name: users[0].name,
            imageUrl: users[0].imageUrl,
            status: 'pending',
            requestId: null,
          });
          this.setState({
            keyword: '',
            keywordErrorMessage: '',
            labelMembers,
            isMemberListShown: false,
          });
        }
      } else if (keyword) {
        this.setState({
          keywordErrorMessage: `${keyword} is not existed.`,
        });
      }
    });
  }

  // For member list
  private handleSearchMemberListItemClick(event: Event, props: any): void {
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
        requestId: null,
      });
      this.setState({
        keyword: '',
        keywordErrorMessage: '',
        labelMembers,
        isMemberListShown: false,
      });
    }
  }

  private handleMemberListCloseButtonClick(): void {
    this.setState({ isMemberListShown: false });
  }

  private handleMemberListRemoveButtonClick(event: Event, props: any): void {
    const labelMembers: ITemporaryLabelMember[] = this.state.labelMembers.filter(
      (temporaryLabelMember: ITemporaryLabelMember): boolean => {
        return props.labelMember.id !== temporaryLabelMember.id;
      },
    );
    this.setState({ labelMembers });
  }

  // For submit label
  private handleSubmitLabelForm(event: Event): void {
    event.preventDefault();
    this.submitLabel();
  }

  private submitLabel(): void {
    const labelName: string = this.state.labelName.trim();
    const labelMembers: ITemporaryLabelMember[] = this.state.labelMembers;
    const id: number | null = this.state.labelId;

    if (labelName && !this.state.uiBlocking) {
      this.setState({ uiBlocking: true });

      if (id === undefined || id === null) {
        this.actions
          .createLabel({ name: labelName })
          .then(({ payload }: { payload: any }) => {
            const label: ILabel = payload.label;
            Promise.all(
              labelMembers.map((labelMember: ITemporaryLabelMember) => {
                return this.actions.createRequest({
                  labelId: label.id,
                  memberId: labelMember.id,
                });
              }),
            ).then(() => {
              this.move('/labels');
            });
          })
          .catch((result: any) => {
            if (result.label.id) {
              this.setState({
                labelId: result.label.id,
                labelMembers: result.members,
                uiBlocking: false,
              });
            }
          });
      } else {
        this.actions
          .updateLabel({ id, name: labelName })
          .then(({ payload }: { payload: any }) => {
            const label: ILabel = payload.label;
            const addedLabelMembers: ITemporaryLabelMember[] = this.state.labelMembers.filter(
              (currentLabelMember: ITemporaryLabelMember): boolean => {
                for (const originLabelMember of label.members) {
                  if (currentLabelMember.id === originLabelMember.id) {
                    return false;
                  }
                }

                return true;
              },
            );
            const removedLabelMembers: ILabelMember[] = label.members.filter(
              (originLabelMember: ILabelMember): boolean => {
                for (const currentLabelMember of this.state.labelMembers) {
                  if (currentLabelMember.id === originLabelMember.id) {
                    return false;
                  }
                }

                return true;
              },
            );
            Promise.all([
              Promise.all(
                addedLabelMembers.map((labelMember: ITemporaryLabelMember) => {
                  return this.actions.createRequest({
                    labelId: label.id,
                    memberId: labelMember.id,
                  });
                }),
              ),
              Promise.all(
                removedLabelMembers.map((labelMember: ITemporaryLabelMember) => {
                  return this.actions.destroyRequest({
                    id: labelMember.requestId,
                  });
                }),
              ),
            ]).then(() => {
              this.move('/labels');
            });
          })
          .catch((result: any) => {
            if (result.label.id) {
              this.setState({
                labelId: result.label.id,
                labelMembers: result.requests,
              });
            }
          });
      }
    }
  }
}
