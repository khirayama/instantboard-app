import * as PropTypes from 'prop-types';
import * as React from 'react';

import Icon from '../../components/icon';

export class UserTabContent extends React.Component<any, any> {
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

    this.state = {
      isEditing: false,
      username: props.user.username || '',
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
    const user = this.props.user;

    return (
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
          <div className="delete-account-button" onClick={this.handleClickDeleteAccountButton}>Delete account</div>
        </div>
      </section>
    );
  }

  private _handleClickLogoutButton() {
    const actions = this.props.actions;
    actions.logout();
  }

  private _handleChangeUserNameInput(event: any) {
    this.setState({username: event.currentTarget.value});
  }

  private _handleBlurUserNameInput() {
    const actions = this.props.actions;
    actions.updateUser(this.state.username.trim());
    this.setState({isEditing: false});
  }

  private _handleClickEditButton() {
    this.setState({isEditing: true});
  }

  private _handleClickDeleteAccountButton() {
    const actions = this.props.actions;
    const isDelete = window.confirm('Delete account!?'); // eslint-disable-line
    if (isDelete) {
      actions.deleteUser();
    }
  }
}
