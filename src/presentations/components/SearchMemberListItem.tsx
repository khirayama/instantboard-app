import * as React from 'react';

import { Img } from 'presentations/components/Img';

export class SearchMemberListItem extends React.Component<any, any> {
  private onClick: (event: React.MouseEvent<HTMLElement>) => void;

  constructor(props: any) {
    super(props);

    this.onClick = this.handleClick.bind(this);
  }

  public render(): JSX.Element {
    const { member } = this.props;

    return (
      <li role="listbox" className="search-member-list-item" onClick={this.onClick}>
        <div className="search-member-list-item--image-container">
          <Img src={member.imageUrl} alt={member.name} />
        </div>
        <p>{member.name}</p>
      </li>
    );
  }

  private handleClick(event: React.MouseEvent<HTMLElement>): void {
    const { onClick } = this.props;

    if (onClick) {
      onClick(event, this.props, this.state);
    }
  }
}
