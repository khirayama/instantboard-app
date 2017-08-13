import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {Icon} from '../../components/icon';

export class UserTabContent extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  constructor(props: any) {
    super(props);

    this.state = {
      isEditing: false,
      username: props.user.username || '',
    };
  }

  public componentDidUpdate(prevProps: any) {
    if (!prevProps.user.username && this.props.user.username) {
      this.setState({
        username: this.props.user.username,
      });
    }
  }

  public handleChangeUsernameInput(event: any) {
    this.setState({username: event.currentTarget.value});
  }

  public render() {
    const user = this.props.user;
    const actions = this.props.actions;
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
                  onBlur={(event: any) => {
                    actions.updateUser(this.state.username.trim());
                    this.setState({isEditing: false});
                  }}
                  onChange={(event: any) => this.handleChangeUsernameInput(event)}
                />
              ) : (
                <p onClick={() => this.setState({isEditing: true})}>
                  {user.username}
                  <Icon>edit</Icon>
                </p>
              )}
            </div>
          </div>
          <div className="logout-button" onClick={() => actions.logout()}>Logout</div>
          <div className="delete-account-button" onClick={() => {
            const isDelete = window.confirm('Delete account!?');
            if (isDelete) {
              actions.deleteUser();
            }
          }}>Delete account</div>
        </div>
      </section>
    );
  }
}
