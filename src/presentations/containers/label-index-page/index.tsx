import * as classNames from 'classnames';
import * as React from 'react';
import {
  destroyLabel,
  fetchLabel,
  sortLabel,
  updateLabel,
} from '../../../action-creators/label';
import {
  pollRequest,
} from '../../../action-creators/request';
import poller from '../../../utils/poller';
import IconLink from '../../components/icon-link';
import Indicator from '../../components/indicator';
import LabelListItem from '../../components/label-list-item';
import List from '../../components/list/list';
import ListItem from '../../components/list/list-item';
import LoadingContent from '../../components/loading-content';
import NoLabelContent from '../../components/no-label-content';
import TabNavigation from '../../components/tab-navigation/tab-navigation';
import TabNavigationContent from '../../components/tab-navigation/tab-navigation-content';
import Container from '../container';

export default class LabelIndexPage extends Container<any, any> {
  private handleSortLabelList: any;

  constructor(props: any) {
    super(props);

    this.actions = {
      pollRequest: () => {
        return pollRequest(this.dispatch, {status: 'pending'});
      },
      fetchLabel: () => {
        return fetchLabel(this.dispatch);
      },
      updateLabel: (label: ILabel) => {
        return updateLabel(this.dispatch, label);
      },
      destroyLabel: (label: ILabel) => {
        return destroyLabel(this.dispatch, label);
      },
      sortLabel: (label: ILabel, to: number) => {
        return sortLabel(this.dispatch, label, to);
      },
    };

    this.handleSortLabelList = this._handleSortLabelList.bind(this);
  }

  public componentDidMount() {
    this.actions.fetchLabel();
    poller.add(this.actions.pollRequest, 5000);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();

    poller.remove(this.actions.pollRequest);
  }


  public render() {
    const labels = this.state.labels;
    const requests = this.state.requests;
    const ui = this.state.ui;

    let backgroundElement: any = null;
    if (ui.isLoadingLabels && labels.length === 0) {
      backgroundElement = <LoadingContent/>;
    } else if (!ui.isLoadingLabels && labels.length === 0) {
      backgroundElement = <NoLabelContent/>;
    }

    const badges = (requests.length) ? [2] : [];

    const parentElement: any = window.document.querySelector('.tab-navigation-content');

    return (
      <section key="label-index-page" className="page label-index-page">
        <Indicator active={(ui.isLoadingLabels && labels.length !== 0)}/>
        <TabNavigationContent>
          <List
            className="label-list"
            parentElement={parentElement}
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
          {(labels.length !== 0) ? (
            <IconLink
              to="/labels/new"
              iconType="add"
              className="label-index-page--add-button"
            >ADD LABEL</IconLink>
          ) : null}
          {backgroundElement}
        </TabNavigationContent>
        <TabNavigation
          index={1}
          badges={badges}
        />
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
}
