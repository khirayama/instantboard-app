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
  name: string;
}

export default class ProfilePage extends Container<IContainerProps, IState> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickLogoutButton: any;

  private handleChangeNameInput: any;

  private handleBlurNameInput: any;

  private handleClickEditButton: any;

  private handleClickDeleteAccountButton: any;

  constructor(props: any) {
    super(props);

    this.state = Object.assign({}, this.state, {
      isEditing: false,
      name: (this.state.profile) ? this.state.profile.name : '',
    });

    this.actions = {
      updateUser: () => {
        let count = 0;
        count++;
      },
      deleteUser: () => {
        let count = 0;
        count++;
      },
      logout: () => {
        let count = 0;
        count++;
      },
    };

    this.handleClickLogoutButton = this._handleClickLogoutButton.bind(this);
    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleBlurNameInput = this._handleBlurNameInput.bind(this);
    this.handleClickEditButton = this._handleClickEditButton.bind(this);
    this.handleClickDeleteAccountButton = this._handleClickDeleteAccountButton.bind(this);
  }

  public componentDidUpdate(prevProps: any) {
    if (!prevProps.user.name && this.props.user.name) {
      this.setState({
        name: this.props.user.name,
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
                  <div className="user-tab-content--name">
                    <div className="user-tab-content--name--icon">
                      <Icon>person</Icon>
                    </div>
                    <div className="user-tab-content--name--input">
                      {(this.state.isEditing) ? (
                        <textarea
                          autoFocus
                          value={this.state.name}
                          onBlur={this.handleBlurNameInput}
                          onChange={this.handleChangeNameInput}
                        />
                      ) : (
                        <p onClick={this.handleClickEditButton}>{user.name}<Icon>edit</Icon></p>
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
          <TabNavigation index={3} addTabLinkPath="/tasks/new"/>
        </div>
      </section>
    );
  }

  private _handleClickLogoutButton() {
    this.actions.logout();
  }

  private _handleChangeNameInput(event: any) {
    this.setState({name: event.currentTarget.value});
  }

  private _handleBlurNameInput() {
    this.actions.updateUser(this.state.name.trim());
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
