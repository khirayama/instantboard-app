import * as React from 'react';
import Icon from '../icon';

export default class SearchMemberListItem extends React.Component<any, any> {
  public render() {
    const member = this.props.member;

    const handleClick = (event: any) => {
      if (this.props.onClick) {
        this.props.onClick(event, this.props, this.state);
      }
    };

    return (
      <li onClick={handleClick}>
        <Icon type="profile"/>
        <p>{member.name}</p>
      </li>
    );
  }
}
