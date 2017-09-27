import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  pollRequest,
} from '../../action-creators/request';
import {
  deleteUser,
  getUser,
  updateUser,
} from '../../action-creators/user';
import {
  TabNavigation,
  TabNavigationContent,
} from '../../components/common/tab-navigation';
import Icon from '../../components/icon';
import poller from '../../utils/poller';
import tokenManager from '../../utils/token-manager';
import Container from '../container';

interface IProfilePageState extends IState {
  isEditing: boolean;
  name: string;
}

export default class ProfilePage extends Container<IContainerProps, IState> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickLogoutButton: any;

  private handleChangeNameInput: any;

  private handleBlurNameInput: any;

  private handleKeyDownNameInput: any;

  private handleClickEditButton: any;

  private handleClickDeleteAccountButton: any;

  constructor(props: any) {
    super(props);

    this.state = Object.assign({}, this.state, {
      isEditing: false,
      name: (this.state.profile) ? this.state.profile.name : '',
    });

    this.actions = {
      pollRequest: () => {
        pollRequest(this.dispatch, {status: 'pending'});
      },
      getUser: () => {
        getUser(this.dispatch);
      },
      updateUser: (profile) => {
        updateUser(this.dispatch, profile);
      },
      deleteUser: () => {
        deleteUser(this.dispatch).then(() => {
          tokenManager.set('');
          this.context.move('/login');
        });
      },
    };

    this.handleClickLogoutButton = this._handleClickLogoutButton.bind(this);
    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleBlurNameInput = this._handleBlurNameInput.bind(this);
    this.handleKeyDownNameInput = this._handleKeyDownNameInput.bind(this);
    this.handleClickEditButton = this._handleClickEditButton.bind(this);
    this.handleClickDeleteAccountButton = this._handleClickDeleteAccountButton.bind(this);
  }

  public componentDidMount() {
    this.actions.getUser();
    poller.add(this.actions.pollRequest, 5000);
  }

  public componentWillUnmount() {
    poller.remove(this.actions.pollRequest);
    super.componentWillUnmount();
  }

  public componentDidUpdate(prevProps, prevState) {
    if (
      !prevState.profile &&
      this.state.profile &&
      this.state.profile.name &&
      this.state.profile.name !== this.state.name
    ) {
      this.setState({
        name: this.state.profile.name,
      });
    }
  }

  public render() {
    const profile = this.state.profile || {};
    const badges = (this.state.requests.length) ? [2] : [];

    return (
      <section className="page profile-page">
        <TabNavigationContent>
          <section className="profile-tab-content">
            <div className="profile-tab-content--information">
              <div className="profile-tab-content--name">
                <div className="profile-tab-content--name--icon">
                  <Icon type="profile" />
                </div>
                <div className="profile-tab-content--name--input">
                  {(this.state.isEditing) ? (
                    <form onSubmit={this.handleBlurNameInput}>
                      <textarea
                        autoFocus
                        value={this.state.name}
                        onBlur={this.handleBlurNameInput}
                        onChange={this.handleChangeNameInput}
                        onKeyDown={this.handleKeyDownNameInput}
                      />
                    </form>
                  ) : (
                    <p onClick={this.handleClickEditButton}>
                      {profile.name}
                      <Icon type="edit" />
                    </p>
                  )}
                </div>
              </div>
              <div className="logout-button" onClick={this.handleClickLogoutButton}>Logout</div>
              <div
                className="delete-account-button"
                onClick={this.handleClickDeleteAccountButton}
              >Delete account</div>
            </div>
          </section>
        </TabNavigationContent>
        <TabNavigation
          index={3}
          badges={badges}
          addTabLinkPath="/tasks/new"
        />
      </section>
    );
  }

  private _handleClickLogoutButton() {
    tokenManager.set('');
    this.context.move('/login');
  }

  private _handleChangeNameInput(event: any) {
    this.setState({name: event.currentTarget.value});
  }

  private _handleBlurNameInput() {
    this.actions.updateUser({
      name: this.state.name.trim(),
    });
    this.setState({isEditing: false});
  }

  private _handleKeyDownNameInput(event: any) {
    const ENTER_KEY = 13;

    const keyCode = event.keyCode;
    const shiftKey = event.shiftKey;
    const metaKey = event.metaKey;

    if (keyCode === ENTER_KEY) {
      this.actions.updateUser({
        name: this.state.name.trim(),
      });
      this.setState({isEditing: false});
    }
  }

  private _handleClickEditButton() {
    this.setState({isEditing: true});
  }

  private _handleClickDeleteAccountButton() {
    const isDelete = window.confirm('Delete account!?'); // eslint-disable-line
    if (isDelete) {
      this.actions.deleteUser();
    }
  }
}
