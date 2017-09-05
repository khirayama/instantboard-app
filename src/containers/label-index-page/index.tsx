import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  destroyLabel,
  fetchLabel,
  sortLabel,
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
      fetchLabel: () => {
        fetchLabel(this.dispatch);
      },
      updateLabel: (label: ILabel) => {
        updateLabel(this.dispatch, label);
      },
      destroyLabel: (label: ILabel) => {
        destroyLabel(this.dispatch, label);
      },
      sortLabel: (label: ILabel, to: number) => {
        sortLabel(this.dispatch, label, to);
      },
    };

    this.handleClickCreateLabelButton = this._handleClickCreateLabelButton.bind(this);
    this.handleSortLabelList = this._handleSortLabelList.bind(this);
  }

  public componentDidMount() {
    this.actions.fetchLabel();
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
              <ListItem key={`skelton-${index}`} className="label-list--item">
                <div className="label-list--item--visible-button">
                  <Icon type="check"/>
                </div>
                <div className="label-list--item--content">
                  <div className="label-list--item--content--loader"><Skeleton/></div>
                </div>
                <div className="label-list--item--destroy-button">
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
    } else if (labels.length !== 0) {
      contentElement = (
        <List
          className="label-list"
          onSort={this.handleSortLabelList}
        >
          {labels.map((label: ILabel) => (
              <LabelListItem
                key={label.id}
                actions={this.actions}
                label={label}
              />
          ))}
        </List>
      );
    }
    return (
      <section className="page label-index-page">
        <TabNavigationContent>{contentElement}</TabNavigationContent>
        <TabNavigation index={1} addTabLinkPath='/labels/new'/>
      </section>
    );
  }

  private _handleSortLabelList(from: number, to: number) {
    const labels = this.state.labels;
    const label = labels[from];

    if (label.priority !== to) {
      this.actions.sortLabel(label, to);
    }
  }

  private _handleClickCreateLabelButton() {
    this.context.move('/labels/new');
  }
}

class LabelListItem extends React.Component<any, any> {
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

    return (
      <ListItem
        {...props}
        className={classNames('label-list--item', {'label-list--item__unvisibled': !label.visibled})}
      >
        <div className="label-list--item--visible-button" onClick={this.handleClickVisibleButton}>
          <Icon type="check" active={!label.visibled}/>
        </div>
        <div className="label-list--item--content" onClick={this.handleClickLabelListItem}>
          <div className="label-list--item--content--text">{label.name}</div>
        </div>
        <div className="label-list--item--destroy-button" onClick={this.handleClickDestroyButton}>
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
