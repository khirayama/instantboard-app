import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  TabNavigation,
  TabNavigationContent,
} from '../../components/custom/tab-navigation';
import {
  List,
  ListItem,
} from '../../components/fundamental/list';
import Container from '../container';

export default class LabelIndexPage extends Container<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleSortLabelList: any;

  constructor(props: any) {
    super(props);

    this.actions = {
      sortLabel: () => {},
    };

    this.handleSortLabelList = this._handleSortLabelList.bind(this);
  }

  public render() {
    const ui = this.state.ui;
    const labels = this.state.labels;

    let contentElement: any = null;

    // Loading label - Show loading content
    //   No labels - Show no labels content
    //   Labels - Show label list
    if (ui.isLoadingLabels) {
      contentElement = (
        <div className="no-label-content">
          <p>Show spinner</p>
        </div>
      );
    } else if (!ui.isLoadingLabels && labels.length === 0) {
      contentElement = (
        <div className="no-label-content">
          <p>No labels</p>
        </div>
      );
    } else if (!ui.isLoadingLabels && labels.length !== 0) {
      contentElement = (
        <List
          className="label-list"
          onSort={this.handleSortLabelList}
        >
          {labels.map((label: any) => {
            return (
              <ListItem key={label.cid}>
                {label.name}
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
    const actions = this.props.actions;
    const labels = this.props.labels;

    const label = labels[from];
    this.actions.sortLabel(label.cid, to);
  }
}
