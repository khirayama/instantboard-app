import * as PropTypes from 'prop-types';
import * as React from 'react';

import { destroyLabel, fetchLabel, sortLabel, updateLabel } from 'action-creators/label';
import { pollRequest } from 'action-creators/request';
import { getUser } from 'action-creators/user';
import { ApplicationContent } from 'presentations/components/ApplicationContent';
import ApplicationHeader from 'presentations/components/ApplicationHeader';
import IconLink from 'presentations/components/IconLink';
import Indicator from 'presentations/components/Indicator';
import LabelListItem from 'presentations/components/LabelListItem';
import List from 'presentations/components/List';
import { LoadingContent } from 'presentations/components/LoadingContent';
import { NoLabelContent } from 'presentations/components/NoLabelContent';
import { Container } from 'presentations/containers/Container';
import { poller } from 'utils/poller';

export class LabelIndexDesktopPage extends Container<{}, IState> {
  public static contextTypes: { move: any } = {
    move: PropTypes.func,
  };

  private onSortLabelList: (fromIndex: number, toIndex: number) => void;

  private onClickVisibleButton: (event: React.MouseEvent<HTMLElement>, labelListItemProps: any) => void;

  private onClickLabelListItem: (event: React.MouseEvent<HTMLElement>, labelListItemProps: any) => void;

  private onClickDestroyButton: (event: React.MouseEvent<HTMLElement>, labelListItemProps: any) => void;

  constructor(props: IContainerProps) {
    super(props);

    this.state = this.getState();

    this.actions = {
      pollRequest: (): Promise<{}> => {
        return pollRequest(this.dispatch, { status: 'pending' });
      },
      getUser: (): Promise<{}> => {
        return getUser(this.dispatch);
      },
      fetchLabel: (): Promise<{}> => {
        return fetchLabel(this.dispatch);
      },
      updateLabel: (label: ILabel): Promise<{}> => {
        return updateLabel(this.dispatch, label);
      },
      destroyLabel: (label: ILabel): Promise<{}> => {
        return destroyLabel(this.dispatch, label);
      },
      sortLabel: (label: ILabel, to: number): Promise<{}> => {
        return sortLabel(this.dispatch, label, to);
      },
    };

    this.onSortLabelList = this.handleSortLabelList.bind(this);
    this.onClickVisibleButton = this.handleClickVisibleButton.bind(this);
    this.onClickLabelListItem = this.handleClickLabelListItem.bind(this);
    this.onClickDestroyButton = this.handleClickDestroyButton.bind(this);
  }

  public componentDidMount(): void {
    this.actions.getUser();
    this.actions.fetchLabel();
    this.actions.pollRequest();
    poller.add(this.actions.pollRequest, 3000);
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();

    poller.remove(this.actions.pollRequest);
  }

  public render(): any {
    const profile: IUser | null = this.state.profile;
    const labels: ILabel[] = this.state.labels;
    const requests: IRequest[] = this.state.requests;
    const ui: IUI = this.state.ui;

    let backgroundElement: React.ReactNode | null = null;
    if (ui.isLoadingLabels && labels.length === 0) {
      backgroundElement = <LoadingContent />;
    } else if (!ui.isLoadingLabels && labels.length === 0) {
      backgroundElement = <NoLabelContent />;
    }

    const badges: number[] = requests.length ? [2] : [];

    const parentElement: Element | null = window.document.querySelector('.tab-navigation-content');

    return (
      <section key="label-index-desktop-page" className="page label-index-desktop-page">
        <Indicator active={ui.isLoadingLabels && labels.length !== 0} />
        <ApplicationHeader index={1} badges={badges} />
        <ApplicationContent>
          <List className="label-list" parentElement={parentElement} onSort={this.onSortLabelList}>
            {labels.map((label: ILabel): React.ReactNode => (
              <LabelListItem
                key={label.id}
                label={label}
                profile={profile}
                onClickVisibleButton={this.onClickVisibleButton}
                onClickLabelListItem={this.onClickLabelListItem}
                onClickDestroyButton={this.onClickDestroyButton}
              />
            ))}
          </List>
          {labels.length === 0 ? null : (
            <IconLink to="/labels/new" iconType="add" className="label-index-desktop-page--add-button">
              {'ADD LABEL'}
            </IconLink>
          )}
          {backgroundElement}
        </ApplicationContent>
      </section>
    );
  }

  private handleSortLabelList(fromIndex: number, toIndex: number): void {
    const labels: ILabel[] = this.state.labels;
    const label: ILabel = labels[fromIndex];

    if (label.priority !== toIndex) {
      this.actions.sortLabel(label, toIndex);
    }
  }

  private handleClickVisibleButton(event: React.MouseEvent<HTMLElement>, labelListItemProps: any): void {
    event.stopPropagation();

    this.actions.updateLabel({
      id: labelListItemProps.label.id,
      visibled: !labelListItemProps.label.visibled,
    });
  }

  private handleClickLabelListItem(event: React.MouseEvent<HTMLElement>, labelListItemProps: any): void {
    this.context.move(`/labels/${labelListItemProps.label.id}/edit`);
  }

  private handleClickDestroyButton(event: React.MouseEvent<HTMLElement>, labelListItemProps: any): void {
    event.stopPropagation();

    this.actions.destroyLabel(labelListItemProps.label);
  }
}
