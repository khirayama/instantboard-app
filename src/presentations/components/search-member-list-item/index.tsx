import * as React from 'react';

export default class SearchMemberListItem extends React.Component<any, any> {
  public render() {
    const { member, onClick } = this.props;

    const handleClick = (event: any) => {
      if (onClick) {
        onClick(event, this.props, this.state);
      }
    };

    return (
      <li className="search-member-list-item" onClick={handleClick}>
        <div className="search-member-list-item--image-container">
          <img src={member.imageUrl} />
        </div>
        <p>{member.name}</p>
      </li>
    );
  }
}
