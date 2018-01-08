import * as PropTypes from 'prop-types';
import * as React from 'react';
import { pollRequest } from '../../../action-creators/request';
import { deleteUser, getUser } from '../../../action-creators/user';
import poller from '../../../utils/poller';
import tokenManager from '../../../utils/token-manager';
import ApplicationContent from '../../components/application-header/application-content';
import ApplicationHeader from '../../components/application-header/application-header';
import FlatButton from '../../components/flat-button';
import Container from '../container';

export default class ProfileDesktopPage extends Container<{}, {}> {
  public static contextTypes: { move: any } = {
    move: PropTypes.func,
  };

  private handleClickLogoutButton: () => void;

  private handleClickDeleteAccountButton: () => void;

  constructor(props: IContainerProps) {
    super(props);

    this.state = Object.assign({}, this.getState());

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

    this.handleClickLogoutButton = this._handleClickLogoutButton.bind(this);
    this.handleClickDeleteAccountButton = this._handleClickDeleteAccountButton.bind(this);
  }

  public componentDidMount() {
    this.actions.getUser();
    this.actions.pollRequest();
    poller.add(this.actions.pollRequest, 3000);
  }

  public componentWillUnmount() {
    poller.remove(this.actions.pollRequest);

    super.componentWillUnmount();
  }

  public render() {
    const profile: IUser = this.state.profile || { id: 0, name: '', email: '', imageUrl: '' };
    const badges: number[] = this.state.requests.length ? [2] : [];

    return (
      <section className="page profile-desktop-page">
        <ApplicationHeader index={3} badges={badges} />
        <ApplicationContent>
          <div className="profile-desktop-page--image">
            <img src={profile.imageUrl} />
          </div>
          <div className="profile-desktop-page--info">
            <p className="profile-desktop-page--info--name">{profile.name}</p>
            <p className="profile-desktop-page--info--email">{profile.email}</p>
          </div>
          <div className="profile-desktop-page--update-button">
            <FlatButton href="https://api.instantboard.cloud/auth/facebook">UPDATE PROFILE WITH FACEBOOK</FlatButton>
          </div>
          <div className="profile-desktop-page--logout-button">
            <FlatButton onClick={this.handleClickLogoutButton}>LOG OUT</FlatButton>
          </div>
          <div className="profile-desktop-page--delete-account-button">
            <FlatButton onClick={this.handleClickDeleteAccountButton}>DELETE ACCOUNT</FlatButton>
          </div>
        </ApplicationContent>
      </section>
    );
  }

  private _handleClickLogoutButton(): void {
    tokenManager.set('');
    this.context.move('/login');
  }

  private _handleClickDeleteAccountButton(): void {
    const isDelete: boolean = window.confirm('Delete account!?'); // eslint-disable-line
    if (isDelete) {
      this.actions.deleteUser().then(() => {
        tokenManager.set('');
        this.context.move('/login');
      });
    }
  }
}
