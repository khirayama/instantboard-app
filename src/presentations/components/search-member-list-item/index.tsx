import * as React from 'react';
import Icon from '../icon';

export default class SearchMemberListItem extends React.Component<any, any> {
  private handleClick: any;

  constructor(props: any) {
    super(props);

    this.handleClick = this._handleClick.bind(this);
  }

  public render() {
    const member = this.props.member;
    return (
      <li
        onClick={this.handleClick}
      >
        <Icon type="profile"/>
        <p>{member.name}</p>
      </li>
    );
  }

  private _handleClick() {
    const member = this.props.member;
    this.props.actions.setMemberName(member.name);
  }
}
