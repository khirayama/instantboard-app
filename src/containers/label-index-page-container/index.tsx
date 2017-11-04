import * as classNames from 'classnames';
import * as React from 'react';
import {
  destroyLabel,
  fetchLabel,
  sortLabel,
  updateLabel,
} from '../../action-creators/label';
import {pollRequest} from '../../action-creators/request';
import LabelIndexPage from '../../components/pages/label-index-page';
import poller from '../../utils/poller';
import Container from '../container';

export default class LabelIndexPageContainer extends Container<any, any> {
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
  }

  public render() {
    return (
      <LabelIndexPage
        actions={this.actions}
        ui={this.state.ui}
        labels={this.state.labels}
        requests={this.state.requests}
      />
    );
  }
}
