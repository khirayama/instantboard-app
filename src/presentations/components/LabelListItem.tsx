import * as classNames from 'classnames';
import * as React from 'react';

import { Icon } from 'presentations/components/Icon';
import { Img } from 'presentations/components/Img';
import { ListItem } from 'presentations/components/ListItem';

export class LabelListItem extends React.Component<any, any> {
  public onClickVisibleButton: (event: React.MouseEvent<HTMLElement>) => void;

  public onClickLabelListItem: (event: React.MouseEvent<HTMLElement>) => void;

  public onClickDestroyButton: (event: React.MouseEvent<HTMLElement>) => void;

  constructor(props: any) {
    super(props);

    this.onClickVisibleButton = this.handleClickVisibleButton.bind(this);
    this.onClickLabelListItem = this.handleClickLabelListItem.bind(this);
    this.onClickDestroyButton = this.handleClickDestroyButton.bind(this);
  }

  public render(): JSX.Element {
    const { label, profile } = this.props;

    const props: any = { ...this.props };
    delete props.label;
    delete props.onClickVisibleButton;
    delete props.onClickLabelListItem;
    delete props.onClickDestroyButton;

    return (
      <ListItem
        {...props}
        className={classNames('label-list-item', { 'label-list-item__unvisibled': !label.visibled })}
        onClick={this.onClickLabelListItem}
      >
        <div role="button" className="label-list-item--visible-button" onClick={this.onClickVisibleButton}>
          <Icon type="check" active={!label.visibled} />
        </div>
        <div className="label-list-item--content">
          <div className="label-list-item--content--text">
            {label.name}
            {label.members
              .filter((member: ILabelMember) => {
                if (profile === null) {
                  return false;
                }

                return member.id !== profile.id;
              })
              .map((member: ILabelMember): JSX.Element => {
                return (
                  <div
                    key={member.id}
                    className={classNames('label-list-item--content--profile-image', {
                      'label-list-item--content--profile-image__accepted': member.status === 'accepted',
                    })}
                  >
                    <Img alt={member.name} src={member.imageUrl} />
                  </div>
                );
              })}
          </div>
        </div>
        <div role="button" className="label-list-item--destroy-button" onClick={this.onClickDestroyButton}>
          <Icon type="remove" active={!label.visibled} />
        </div>
      </ListItem>
    );
  }

  public handleClickVisibleButton(event: React.MouseEvent<HTMLElement>): void {
    const { onClickVisibleButton } = this.props;

    if (onClickVisibleButton) {
      onClickVisibleButton(event, this.props, this.state);
    }
  }

  public handleClickLabelListItem(event: React.MouseEvent<HTMLElement>): void {
    const { onClickLabelListItem } = this.props;

    if (onClickLabelListItem) {
      onClickLabelListItem(event, this.props, this.state);
    }
  }

  public handleClickDestroyButton(event: React.MouseEvent<HTMLElement>): void {
    const { onClickDestroyButton } = this.props;

    if (onClickDestroyButton) {
      onClickDestroyButton(event, this.props, this.state);
    }
  }
}
