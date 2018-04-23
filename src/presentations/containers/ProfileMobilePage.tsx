import * as PropTypes from 'prop-types';
import * as React from 'react';

import { pollRequest } from 'action-creators/request';
import { deleteUser, getUser } from 'action-creators/user';
import { FlatButton } from 'presentations/components/FlatButton';
import { TabNavigation } from 'presentations/components/TabNavigation';
import { TabNavigationContent } from 'presentations/components/TabNavigationContent';
import { Container } from 'presentations/containers/Container';
import { poller } from 'utils/poller';
import { tokenManager } from 'utils/tokenManager';

export class ProfileMobilePage extends Container<{}, {}> {
  public static contextTypes: { move: any } = {
    move: PropTypes.func,
  };

  private onClickLogoutButton: () => void;

  private onClickDeleteAccountButton: () => void;

  constructor(props: IContainerProps) {
    super(props);

    this.state = { ...this.getState() };

    this.actions = {
      pollRequest: (): Promise<{}> => {
        return pollRequest(this.dispatch, { status: 'pending' });
      },
      getUser: (): Promise<{}> => {
        return getUser(this.dispatch);
      },
      deleteUser: (): Promise<{}> => {
        return deleteUser(this.dispatch);
      },
    };

    this.onClickLogoutButton = this.handleClickLogoutButton.bind(this);
    this.onClickDeleteAccountButton = this.handleClickDeleteAccountButton.bind(this);
  }

  public componentDidMount(): void {
    this.actions.getUser();
    this.actions.pollRequest();
    poller.add(this.actions.pollRequest, 3000);
  }

  public componentWillUnmount(): void {
    poller.remove(this.actions.pollRequest);

    super.componentWillUnmount();
  }

  public render(): any {
    const profile: IUser = this.state.profile || {
      id: 0,
      name: '',
      email: '',
      imageUrl:
        'data:image/png;base64,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',
    };
    const badges: number[] = this.state.requests.length ? [2] : [];

    return (
      <section className="page profile-mobile-page">
        <TabNavigationContent>
          <div className="profile-mobile-page--image">
            <img src={profile.imageUrl} alt="profile image" />
          </div>
          <div className="profile-mobile-page--info">
            <p className="profile-mobile-page--info--name">{profile.name}</p>
            <p className="profile-mobile-page--info--email">{profile.email}</p>
          </div>
          <div className="profile-mobile-page--update-button">
            <FlatButton href="https://api.instantboard.cloud/auth/facebook">UPDATE PROFILE WITH FACEBOOK</FlatButton>
          </div>
          <div className="profile-mobile-page--logout-button">
            <FlatButton onClick={this.onClickLogoutButton}>LOG OUT</FlatButton>
          </div>
          <div className="profile-mobile-page--delete-account-button">
            <FlatButton onClick={this.onClickDeleteAccountButton}>DELETE ACCOUNT</FlatButton>
          </div>
        </TabNavigationContent>
        <TabNavigation index={3} badges={badges} />
      </section>
    );
  }

  private handleClickLogoutButton(): void {
    tokenManager.set('');
    this.context.move('/login');
  }

  private handleClickDeleteAccountButton(): void {
    const isDelete: boolean = window.confirm('Delete account!?'); // eslint-disable-line
    if (isDelete) {
      this.actions.deleteUser().then(() => {
        tokenManager.set('');
        this.context.move('/login');
      });
    }
  }
}
