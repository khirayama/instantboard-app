import * as React from 'react';
import {
  createLabel,
  fetchLabel,
  updateLabel,
} from '../../../action-creators/label';
import {fetchMember} from '../../../action-creators/member';
import {getUser} from '../../../action-creators/user';
import LabelPage from '../../pages/label-page';
import Container from '../container';

export default class LabelPageContainer extends Container<any, any> {
  constructor(props: any) {
    super(props);

    this.actions = {
      fetchMember: () => {
        return fetchMember(this.dispatch);
      },
      fetchLabel: () => {
        return fetchLabel(this.dispatch);
      },
      createLabel: (label: ILabelRequest) => {
        return createLabel(this.dispatch, label);
      },
      updateLabel: (label: ILabelRequest) => {
        return updateLabel(this.dispatch, label);
      },
      getUser: () => {
        return getUser(this.dispatch);
      },
    };
  }

  public render() {
    return (
      <LabelPage
        actions={this.actions}
        params={this.props.params}
        ui={this.state.ui}
        labels={this.state.labels}
        profile={this.state.profile}
        members={this.state.members}
      />
    );
  }
}
