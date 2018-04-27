import * as React from 'react';

export class SearchMemberListItem extends React.Component<any, any> {
  public render(): any {
    const { member, onClick } = this.props;

    function handleClick(event: any): void {
      if (onClick) {
        onClick(event, this.props, this.state);
      }
    }

    return (
      <li role="listbox" className="search-member-list-item" onClick={handleClick}>
        <div className="search-member-list-item--image-container">
          <img src={member.imageUrl} alt="profile image" />
        </div>
        <p>{member.name}</p>
      </li>
    );
  }
}
