import * as classNames from 'classnames';
import * as React from 'react';
import {
  destroyLabel,
  fetchLabel,
  sortLabel,
  updateLabel,
} from '../../../action-creators/label';
import {pollRequest} from '../../../action-creators/request';
import {
  ApplicationContent,
  ApplicationHeader,
} from '../../../components/common/application-header';
import IconLink from '../../../components/common/icon-link';
import LoadingContent from '../../../components/common/loading-content';
import NoLabelContent from '../../../components/common/no-label-content';
import Indicator from '../../../components/indicator';
import {
  List,
  ListItem,
} from '../../../components/list';
import poller from '../../../utils/poller';
import Container from '../../container';
import LabelListItem from './label-list-item';

export default class LabelIndexPage extends Container<any, any> {
  private handleSortLabelList: any;

  constructor(props: any) {
    super(props);

    this.actions = {
      pollRequest: () => {
        pollRequest(this.dispatch, {status: 'pending'});
      },
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

    this.handleSortLabelList = this._handleSortLabelList.bind(this);
  }

  public componentDidMount() {
    this.actions.fetchLabel();
    poller.add(this.actions.pollRequest, 5000);
  }

  public componentWillUnmount() {
    poller.remove(this.actions.pollRequest);
    super.componentWillUnmount();
  }

  public render() {
    const ui = this.state.ui;
    const labels = this.state.labels;

    let backgroundElement: any = null;
    if (ui.isLoadingLabels && labels.length === 0) {
      backgroundElement = <LoadingContent/>;
    } else if (!ui.isLoadingLabels && labels.length === 0) {
      backgroundElement = <NoLabelContent/>;
    }

    const badges = (this.state.requests.length) ? [2] : [];

    const parentElement: any = window.document.querySelector('.tab-navigation-content');

    return (
      <section key="label-index-page" className="page label-index-page">
        <Indicator active={(ui.isLoadingLabels && labels.length !== 0)}/>
        <ApplicationHeader
          index={1}
          badges={badges}
        />
        <ApplicationContent>
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
        </ApplicationContent>
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
