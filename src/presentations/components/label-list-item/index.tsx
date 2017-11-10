import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Icon from '../icon';
import ListItem from '../list/list-item';

export default class LabelListItem extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickVisibleButton: any;

  private handleClickLabelListItem: any;

  private handleClickDestroyButton: any;

  constructor(props: any) {
    super(props);

    this.handleClickVisibleButton = this._handleClickVisibleButton.bind(this);
    this.handleClickLabelListItem = this._handleClickLabelListItem.bind(this);
    this.handleClickDestroyButton = this._handleClickDestroyButton.bind(this);
  }

  public render() {
    const label = this.props.label;
    const props = Object.assign({}, this.props);

    delete props.actions;
    delete props.label;

    return (
      <ListItem
        {...props}
        className={classNames('label-list-item', {'label-list-item__unvisibled': !label.visibled})}
      >
        <div className="label-list-item--visible-button" onClick={this.handleClickVisibleButton}>
          <Icon type="check" active={!label.visibled}/>
        </div>
        <div className="label-list-item--content" onClick={this.handleClickLabelListItem}>
          <div className="label-list-item--content--text">{label.name}</div>
        </div>
        <div className="label-list-item--destroy-button" onClick={this.handleClickDestroyButton}>
          <Icon type="remove" active={!label.visibled}/>
        </div>
      </ListItem>
    );
  }

  private _handleClickVisibleButton() {
    const label = this.props.label;
    const actions = this.props.actions;

    actions.updateLabel({
      id: label.id,
      visibled: !label.visibled,
    });
  }

  private _handleClickLabelListItem() {
    const label = this.props.label;

    this.context.move(`/labels/${label.id}/edit`);
  }

  private _handleClickDestroyButton() {
    const label = this.props.label;
    const actions = this.props.actions;

    actions.destroyLabel(label);
  }
}
