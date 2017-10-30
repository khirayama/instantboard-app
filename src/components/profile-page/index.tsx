import * as PropTypes from 'prop-types';
import * as React from 'react';
import FlatButton from '../../components/flat-button';
import Icon from '../../components/icon';
import {
  TabNavigation,
  TabNavigationContent,
} from '../../components/tab-navigation';
import poller from '../../utils/poller';
import tokenManager from '../../utils/token-manager';

export default class ProfilePage extends React.Component<any, any> {
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

    this.state = {
      isEditing: false,
      name: (props.profile) ? props.profile.name : '',
    };

    this.handleClickLogoutButton = this._handleClickLogoutButton.bind(this);
    this.handleChangeNameInput = this._handleChangeNameInput.bind(this);
    this.handleBlurNameInput = this._handleBlurNameInput.bind(this);
    this.handleKeyDownNameInput = this._handleKeyDownNameInput.bind(this);
    this.handleClickEditButton = this._handleClickEditButton.bind(this);
    this.handleClickDeleteAccountButton = this._handleClickDeleteAccountButton.bind(this);
  }

  public componentDidMount() {
    this.props.actions.getUser();
    poller.add(this.props.actions.pollRequest, 5000);
  }

  public componentWillUnmount() {
    poller.remove(this.props.actions.pollRequest);
  }

  public componentDidUpdate(prevProps) {
    if (
      !prevProps.profile &&
      this.props.profile &&
      this.props.profile.name &&
      this.props.profile.name !== this.state.name
    ) {
      this.setState({
        name: this.props.profile.name,
      });
    }
  }

  public render() {
    const profile = this.props.profile || {};
    const badges = (this.props.requests.length) ? [2] : [];

    return (
      <section className="page profile-page">
        <TabNavigationContent>
          <div className="profile-tab-content--name--input">
            <Icon type="profile" />
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
          <div className="profile-page--logout-button">
            <FlatButton
              onClick={this.handleClickLogoutButton}
            >LOG OUT</FlatButton>
          </div>
          <div className="profile-page--delete-account-button">
            <FlatButton
              onClick={this.handleClickDeleteAccountButton}
            >DELETE ACCOUNT</FlatButton>
          </div>
        </TabNavigationContent>
        <TabNavigation
          index={3}
          badges={badges}
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
    this.props.actions.updateUser({
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
      this.props.actions.updateUser({
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
      this.props.actions.deleteUser().then(() => {
        tokenManager.set('');
        this.context.move('/login');
      });
    }
  }
}
