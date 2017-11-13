import * as classNames from 'classnames';
import * as React from 'react';
import Icon from '../icon';
import ListItem from '../list/list-item';

export default class LabelListItem extends React.Component<any, any> {
  public render() {
    const label = this.props.label;

    const handleClickVisibleButton = (event: any) => {
      if (this.props.onClickVisibleButton) {
        this.props.onClickVisibleButton(event, this.props, this.state);
      }
    };

    const handleClickLabelListItem = (event: any) => {
      if (this.props.onClickLabelListItem) {
        this.props.onClickLabelListItem(event, this.props, this.state);
      }
    };

    const handleClickDestroyButton = (event: any) => {
      if (this.props.onClickDestroyButton) {
        this.props.onClickDestroyButton(event, this.props, this.state);
      }
    };

    const props = Object.assign({}, this.props);

    delete props.label;
    delete props.onClickVisibleButton;
    delete props.onClickLabelListItem;
    delete props.onClickDestroyButton;

    return (
      <ListItem
        {...props}
        className={classNames('label-list-item', {'label-list-item__unvisibled': !label.visibled})}
      >
        <div
          className="label-list-item--visible-button"
          onClick={handleClickVisibleButton}
        >
          <Icon type="check" active={!label.visibled}/>
        </div>
        <div
          className="label-list-item--content"
          onClick={handleClickLabelListItem}
        >
          <div className="label-list-item--content--text">{label.name}</div>
        </div>
        <div
          className="label-list-item--destroy-button"
          onClick={handleClickDestroyButton}
        >
          <Icon type="remove" active={!label.visibled}/>
        </div>
      </ListItem>
    );
  }
}
