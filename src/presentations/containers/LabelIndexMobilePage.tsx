import * as React from 'react';

import { destroyLabel, fetchLabel, sortLabel, updateLabel } from 'action-creators/label';
import { pollRequest } from 'action-creators/request';
import { getUser } from 'action-creators/user';
import { IconLink } from 'presentations/components/IconLink';
import { Indicator } from 'presentations/components/Indicator';
import { LabelListItem } from 'presentations/components/LabelListItem';
import { List } from 'presentations/components/List';
import { LoadingContent } from 'presentations/components/LoadingContent';
import { NoLabelContent } from 'presentations/components/NoLabelContent';
import { TabNavigation } from 'presentations/components/TabNavigation';
import { TabNavigationContent } from 'presentations/components/TabNavigationContent';
import { Container, IContainerProps } from 'presentations/containers/Container';
import { context } from 'router/Navigator';
import { poller } from 'utils/poller';

export class LabelIndexMobilePage extends Container<{}, IState> {
  private move: any;

  private onSortLabelList: (fromIndex: number, toIndex: number) => void;

  private onClickVisibleButton: (event: React.MouseEvent<HTMLElement>, labelListItemProps: any) => void;

  private onClickLabelListItem: (event: React.MouseEvent<HTMLElement>, labelListItemProps: any) => void;

  private onClickDestroyButton: (event: React.MouseEvent<HTMLElement>, labelListItemProps: any) => void;

  constructor(props: IContainerProps) {
    super(props);

    this.state = this.getState();

    this.actions = {
      pollRequest: (): Promise<IAction> => {
        return pollRequest(this.dispatch, { status: 'pending' });
      },
      getUser: (): Promise<IAction> => {
        return getUser(this.dispatch);
      },
      fetchLabel: (): Promise<IAction> => {
        return fetchLabel(this.dispatch);
      },
      updateLabel: (label: ILabel): Promise<IAction> => {
        return updateLabel(this.dispatch, label);
      },
      destroyLabel: (label: ILabel): Promise<IAction> => {
        return destroyLabel(this.dispatch, label);
      },
      sortLabel: (label: ILabel, to: number): Promise<IAction> => {
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

  public render(): JSX.Element {
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
      <section key="label-index-mobile-page" className="page label-index-mobile-page">
        <context.Consumer>{this.bindContext.bind(this)}</context.Consumer>
        <Indicator active={ui.isLoadingLabels && labels.length !== 0} />
        <TabNavigationContent>
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
            <IconLink to="/labels/new" iconType="add" className="label-index-mobile-page--add-button">
              {'ADD LABEL'}
            </IconLink>
          )}
          {backgroundElement}
        </TabNavigationContent>
        <TabNavigation index={1} badges={badges} />
      </section>
    );
  }

  private bindContext(ctx: any): null {
    this.move = ctx.move;

    return null;
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
    this.move(`/labels/${labelListItemProps.label.id}/edit`);
  }

  private handleClickDestroyButton(event: React.MouseEvent<HTMLElement>, labelListItemProps: any): void {
    event.stopPropagation();

    this.actions.destroyLabel(labelListItemProps.label);
  }
}
