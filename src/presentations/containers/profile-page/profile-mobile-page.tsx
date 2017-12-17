import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  pollRequest,
} from '../../../action-creators/request';
import {
  deleteUser,
  getUser,
  updateUser,
} from '../../../action-creators/user';
import poller from '../../../utils/poller';
import tokenManager from '../../../utils/token-manager';
import FlatButton from '../../components/flat-button';
import Icon from '../../components/icon';
import TabNavigation from '../../components/tab-navigation/tab-navigation';
import TabNavigationContent from '../../components/tab-navigation/tab-navigation-content';
import Container from '../container';

export default class ProfileMobilePage extends Container<IContainerProps, IState> {
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

    const {profile} = props;
    const initialState = {
      isEditing: false,
      name: (profile) ? profile.name : '',
    };

    this.state = Object.assign({}, this.state, initialState);

    this.actions = {
      pollRequest: () => {
        return pollRequest(this.dispatch, {status: 'pending'});
      },
      getUser: () => {
        return getUser(this.dispatch);
      },
      updateUser: newProfile => {
        return updateUser(this.dispatch, newProfile);
      },
      deleteUser: () => {
        return deleteUser(this.dispatch);
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
    this.onUpdate(() => {
      const {profile, name} = this.state;
      if (
        !prevState.profile &&
        profile &&
        profile.name &&
        profile.name !== name
      ) {
        this.setState({
          name: profile.name,
        });
      }
    });
  }

  public render() {
    const profile = this.state.profile || {};
    const badges = (this.state.requests.length) ? [2] : [];

    return (
      <section className="page profile-mobile-page">
        <TabNavigationContent>
          <div className="profile-tab-content--name--input">
            <Icon type="profile"/>
            {(this.state.isEditing) ? (
              <form onSubmit={this.handleBlurNameInput}>
                <input
                  autoFocus
                  type="text"
                  value={this.state.name}
                  onBlur={this.handleBlurNameInput}
                  onChange={this.handleChangeNameInput}
                  onKeyDown={this.handleKeyDownNameInput}
                />
              </form>
            ) : (
              <p onClick={this.handleClickEditButton}>
                {profile.name}
              </p>
            )}
          </div>
          <div className="profile-mobile-page--logout-button">
            <FlatButton
              onClick={this.handleClickLogoutButton}
            >
              {'LOG OUT'}
            </FlatButton>
          </div>
          <div className="profile-mobile-page--delete-account-button">
            <FlatButton
              onClick={this.handleClickDeleteAccountButton}
            >
              {'DELETE ACCOUNT'}
            </FlatButton>
          </div>
        </TabNavigationContent>
        <TabNavigation
          index={3}
          badges={badges}
        />
      </section>
    );
  }

  private onUpdate(callback) {
    callback();
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
      this.actions.deleteUser().then(() => {
        tokenManager.set('');
        this.context.move('/login');
      });
    }
  }
}
