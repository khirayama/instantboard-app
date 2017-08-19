import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  TabNavigation,
  TabNavigationContent,
} from '../../components/custom/tab-navigation';
import Container from '../container';
import {
  List,
  ListItem,
} from '../../components/fundamental/list';

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
    const user = this.state.profile || {};
    const labels = this.state.labels;
    const tasks = this.state.tasks;
    const requests = this.state.requests;
    const members = this.state.members;

    return (
      <section className="page main-page">
        <div className="tab-navigation">
          <div className="tab-navigation-content-list tab-navigation-content-list__active">
            <div className="tab-navigation-content-list-item">
              {
                (labels.length) ? (
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
                ) : (
                  <div className="no-label-content">
                    <p>No labels</p>
                  </div>
                )
              }
            </div>
          </div>
          <TabNavigation index={1}/>
        </div>
      </section>
    );
  }

  private _handleSortLabelList(from: number, to: number) {
    const labels = this.props.labels;
    const actions = this.props.actions;

    const label = labels[from];
    this.actions.sortLabel(label.cid, to);
  }
}
