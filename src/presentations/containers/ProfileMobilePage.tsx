import * as React from 'react';

import { pollRequest } from 'action-creators/request';
import { deleteUser, getUser } from 'action-creators/user';
import { FlatButton } from 'presentations/components/FlatButton';
import { Img } from 'presentations/components/Img';
import { TabNavigation } from 'presentations/components/TabNavigation';
import { TabNavigationContent } from 'presentations/components/TabNavigationContent';
import { Container, IContainerProps } from 'presentations/containers/Container';
import { context } from 'router/Navigator';
import { poller } from 'utils/poller';
import { tokenManager } from 'utils/tokenManager';

export class ProfileMobilePage extends Container<{}, {}> {
  private move: any;

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

  public render(): JSX.Element {
    const profile: IUser = this.state.profile || {
      id: 0,
      name: '',
      email: '',
      imageUrl: '',
    };
    const badges: number[] = this.state.requests.length ? [2] : [];

    return (
      <section className="page profile-mobile-page">
        <context.Consumer>{this.bindContext.bind(this)}</context.Consumer>
        <TabNavigationContent>
          <div className="profile-mobile-page--image">
            <div className="profile-mobile-page--image--content">
              <Img src={profile.imageUrl} alt={profile.name} />
            </div>
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

  private bindContext(ctx: any): null {
    this.move = ctx.move;

    return null;
  }

  private handleClickLogoutButton(): void {
    tokenManager.set('');
    this.move('/login');
  }

  private handleClickDeleteAccountButton(): void {
    const isDelete: boolean = window.confirm('Delete account!?'); // eslint-disable-line
    if (isDelete) {
      this.actions.deleteUser().then(() => {
        tokenManager.set('');
        this.move('/login');
      });
    }
  }
}
