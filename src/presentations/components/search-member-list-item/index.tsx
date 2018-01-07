import * as React from 'react';
import Icon from '../icon';

export default class SearchMemberListItem extends React.Component<any, any> {
  public render() {
    const { member, onClick } = this.props;

    const handleClick = (event: any) => {
      if (onClick) {
        onClick(event, this.props, this.state);
      }
    };

    return (
      <li onClick={handleClick}>
        <Icon type="profile" />
        <p>
          {member.name} {`<${member.email}>`}
        </p>
      </li>
    );
  }
}
