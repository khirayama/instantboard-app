import * as classNames from 'classnames';
import * as React from 'react';
import Icon from '../icon';
import ListItem from '../list/list-item';

export default class LabelListItem extends React.Component<any, any> {
  public render() {
    const { label, profile, onClickVisibleButton, onClickLabelListItem, onClickDestroyButton } = this.props;

    const handleClickVisibleButton = (event: any) => {
      if (onClickVisibleButton) {
        onClickVisibleButton(event, this.props, this.state);
      }
    };

    const handleClickLabelListItem = (event: any) => {
      if (onClickLabelListItem) {
        onClickLabelListItem(event, this.props, this.state);
      }
    };

    const handleClickDestroyButton = (event: any) => {
      if (onClickDestroyButton) {
        onClickDestroyButton(event, this.props, this.state);
      }
    };

    const props: any = Object.assign({}, this.props);
    delete props.label;
    delete props.onClickVisibleButton;
    delete props.onClickLabelListItem;
    delete props.onClickDestroyButton;

    return (
      <ListItem
        {...props}
        className={classNames('label-list-item', { 'label-list-item__unvisibled': !label.visibled })}
        onClick={handleClickLabelListItem}
      >
        <div className="label-list-item--visible-button" onClick={handleClickVisibleButton}>
          <Icon type="check" active={!label.visibled} />
        </div>
        <div className="label-list-item--content">
          <div className="label-list-item--content--text">
            {label.name}
            {label.members
              .filter(member => {
                if (profile === null) {
                  return false;
                }
                return member.id !== profile.id;
              })
              .map(member => {
                return (
                  <img
                    key={member.id}
                    className={classNames('label-list-item--content--profile-image', {
                      'label-list-item--content--profile-image__accepted': member.status === 'accepted',
                    })}
                    src={member.imageUrl}
                  />
                );
              })}
          </div>
        </div>
        <div className="label-list-item--destroy-button" onClick={handleClickDestroyButton}>
          <Icon type="remove" active={!label.visibled} />
        </div>
      </ListItem>
    );
  }
}
