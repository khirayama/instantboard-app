import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  createLabel,
  destroyLabel,
  fetchLabel,
  updateLabel,
} from '../../action-creators';
import {
  TabNavigation,
  TabNavigationContent,
} from '../../components/common/tab-navigation';
import FloatingButton from '../../components/floating-button';
import {Icon} from '../../components/icon';
import {
  List,
  ListItem,
} from '../../components/list';
import Skeleton from '../../components/skeleton';
import Container from '../container';

export default class LabelIndexPage extends Container<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickCreateLabelButton: any;

  private handleSortLabelList: any;

  constructor(props: any) {
    super(props);

    this.actions = {
      sortLabel: () => {},
    };

    this.handleClickCreateLabelButton = this._handleClickCreateLabelButton.bind(this);
    this.handleSortLabelList = this._handleSortLabelList.bind(this);
  }

  public render() {
    const ui = this.state.ui;
    const labels = this.state.labels;

    let contentElement: any = null;

    // Loading label - Show skeleton
    //   No labels - Show no labels content
    //   Labels - Show label list
    if (labels.length === 0 && ui.isLoadingLabels) {
      contentElement = (
        <List className="label-list">
          {[0, 1, 2].map((index: number) => {
            return (
              <ListItem key={index} className="label-list--item">
                <div className="label-list--item--visible-button">
                  <Icon type="check"/>
                </div>
                <div className="label-list--item--content">
                  <div className="label-list--item--content--loader"><Skeleton/></div>
                </div>
                <div className="label-list--item--delete-button">
                  <Icon type="remove"/>
                </div>
              </ListItem>
            );
          })}
        </List>
      );
    } else if (!ui.isLoadingLabels && labels.length === 0) {
      contentElement = (
        <div className="label-index-page--content--no-labels">
          <div className="label-index-page--content--no-labels--inner">
            <p>You have no labels.<br/>Create category of task as label.</p>
            <FloatingButton onClick={this.handleClickCreateLabelButton}>CREATE LABEL</FloatingButton>
          </div>
        </div>
      );
    } else if (!ui.isLoadingLabels && labels.length !== 0) {
      contentElement = (
        <List
          className="label-list"
          onSort={this.handleSortLabelList}
        >
          {labels.map((label: ILabel) => {
            return (
              <ListItem
                key={label.cid}
                className={classNames('label-list--item', {'label-list--item__unvisibled': !label.visibled})}
              >
                <div className="label-list--item--visible-button">
                  <VisibilityIcon/>
                </div>
                <div className="label-list--item--content">
                  <div className="label-list--item--content--text">{label.name}</div>
                </div>
                <div className="label-list--item--delete-button">
                  <RemoveIcon/>
                </div>
              </ListItem>
            );
          })}
        </List>
      );
    }
    return (
      <section className="page label-index-page">
        <TabNavigationContent>{contentElement}</TabNavigationContent>
        <TabNavigation index={1}/>
      </section>
    );
  }

  private _handleSortLabelList(from: number, to: number) {
    const labels = this.props.labels;
    const label = labels[from];

    this.actions.sortLabel(label.cid, to);
  }

  private _handleClickCreateLabelButton() {
    this.context.move('/labels/new');
  }
}
