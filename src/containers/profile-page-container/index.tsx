import * as React from 'react';
import {
  pollRequest,
} from '../../action-creators/request';
import {
  deleteUser,
  getUser,
  updateUser,
} from '../../action-creators/user';
import ProfilePage from '../../components/profile-page';
import Container from '../container';

export default class ProfilePageContainer extends Container<IContainerProps, IState> {
  constructor(props: any) {
    super(props);

    this.actions = {
      pollRequest: () => {
        return pollRequest(this.dispatch, {status: 'pending'});
      },
      getUser: () => {
        return getUser(this.dispatch);
      },
      updateUser: (profile) => {
        return updateUser(this.dispatch, profile);
      },
      deleteUser: () => {
        return deleteUser(this.dispatch);
      },
    };
  }

  public render() {
    return (
      <ProfilePage
        actions={this.actions}
        profile={this.state.profile}
        requests={this.state.requests}
      />
    );
  }
}
