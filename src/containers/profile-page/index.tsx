import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  TabNavigation,
  TabNavigationContent,
} from '../../components/common/tab-navigation';
import {Icon} from '../../components/icon';
import Container from '../container';

interface IProfilePageState extends IState {
  isEditing: boolean;
  username: string;
}

export default class ProfilePage extends Container<IContainerProps, IState> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickLogoutButton: any;

  private handleChangeUserNameInput: any;

  private handleBlurUserNameInput: any;

  private handleClickEditButton: any;

  private handleClickDeleteAccountButton: any;

  constructor(props: any) {
    super(props);

    this.state = Object.assign({}, this.state, {
      isEditing: false,
      username: (this.state.profile) ? this.state.profile.username : '',
    });

    this.actions = {
      updateUser: () => {},
      deleteUser: () => {},
      logout: () => {},
    };

    this.handleClickLogoutButton = this._handleClickLogoutButton.bind(this);
    this.handleChangeUserNameInput = this._handleChangeUserNameInput.bind(this);
    this.handleBlurUserNameInput = this._handleBlurUserNameInput.bind(this);
    this.handleClickEditButton = this._handleClickEditButton.bind(this);
    this.handleClickDeleteAccountButton = this._handleClickDeleteAccountButton.bind(this);
  }

  public componentDidUpdate(prevProps: any) {
    if (!prevProps.user.username && this.props.user.username) {
      this.setState({
        username: this.props.user.username,
      });
    }
  }

  public render() {
    const user = this.state.profile || {};

    return (
      <section className="page main-page">
        <div className="tab-navigation">
          <div className="tab-navigation-content-list tab-navigation-content-list__active">
            <div className="tab-navigation-content-list-item">
              <section className="user-tab-content">
                <div className="user-tab-content--information">
                  <div className="user-tab-content--username">
                    <div className="user-tab-content--username--icon">
                      <Icon>person</Icon>
                    </div>
                    <div className="user-tab-content--username--input">
                      {(this.state.isEditing) ? (
                        <textarea
                          autoFocus
                          value={this.state.username}
                          onBlur={this.handleBlurUserNameInput}
                          onChange={this.handleChangeUserNameInput}
                        />
                      ) : (
                        <p onClick={this.handleClickEditButton}>{user.username}<Icon>edit</Icon></p>
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
            </div>
          </div>
          <TabNavigation index={3} addTabLinkPath='/tasks/new'/>
        </div>
      </section>
    );
  }

  private _handleClickLogoutButton() {
    this.actions.logout();
  }

  private _handleChangeUserNameInput(event: any) {
    this.setState({username: event.currentTarget.value});
  }

  private _handleBlurUserNameInput() {
    this.actions.updateUser(this.state.username.trim());
    this.setState({isEditing: false});
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
