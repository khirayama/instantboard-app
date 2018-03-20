import * as PropTypes from 'prop-types';
import * as React from 'react';
import { destroyLabel, fetchLabel, sortLabel, updateLabel } from 'action-creators/label';
import { pollRequest } from 'action-creators/request';
import { getUser } from 'action-creators/user';
import poller from 'utils/poller';
import IconLink from 'presentations/components/IconLink';
import Indicator from 'presentations/components/Indicator';
import LabelListItem from 'presentations/components/LabelListItem';
import List from 'presentations/components/List';
import LoadingContent from 'presentations/components/LoadingContent';
import NoLabelContent from 'presentations/components/NoLabelContent';
import TabNavigation from 'presentations/components/TabNavigation';
import TabNavigationContent from 'presentations/components/TabNavigationContent';
import Container from 'presentations/containers/Container';

export default class LabelIndexMobilePage extends Container<{}, IState> {
  public static contextTypes: { move: any } = {
    move: PropTypes.func
  };

  private handleSortLabelList: (from: number, to: number) => void;

  private handleClickVisibleButton: (event: React.MouseEvent<HTMLElement>, labelListItemProps: any) => void;

  private handleClickLabelListItem: (event: React.MouseEvent<HTMLElement>, labelListItemProps: any) => void;

  private handleClickDestroyButton: (event: React.MouseEvent<HTMLElement>, labelListItemProps: any) => void;

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
      }
    };

    this.handleSortLabelList = this._handleSortLabelList.bind(this);
    this.handleClickVisibleButton = this._handleClickVisibleButton.bind(this);
    this.handleClickLabelListItem = this._handleClickLabelListItem.bind(this);
    this.handleClickDestroyButton = this._handleClickDestroyButton.bind(this);
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

  public render() {
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
      <section key='label-index-mobile-page' className='page label-index-mobile-page'>
        <Indicator active={ui.isLoadingLabels && labels.length !== 0} />
        <TabNavigationContent>
          <List className='label-list' parentElement={parentElement} onSort={this.handleSortLabelList}>
            {labels.map((label: ILabel): React.ReactNode => (
              <LabelListItem
                key={label.id}
                label={label}
                profile={profile}
                onClickVisibleButton={this.handleClickVisibleButton}
                onClickLabelListItem={this.handleClickLabelListItem}
                onClickDestroyButton={this.handleClickDestroyButton}
              />
            ))}
          </List>
          {labels.length === 0 ? null : (
            <IconLink to='/labels/new' iconType='add' className='label-index-mobile-page--add-button'>
              {'ADD LABEL'}
            </IconLink>
          )}
          {backgroundElement}
        </TabNavigationContent>
        <TabNavigation index={1} badges={badges} />
      </section>
    );
  }

  private _handleSortLabelList(from: number, to: number): void {
    const labels: ILabel[] = this.state.labels;
    const label: ILabel = labels[from];

    if (label.priority !== to) {
      this.actions.sortLabel(label, to);
    }
  }

  private _handleClickVisibleButton(event: React.MouseEvent<HTMLElement>, labelListItemProps: any): void {
    event.stopPropagation();

    this.actions.updateLabel({
      id: labelListItemProps.label.id,
      visibled: !labelListItemProps.label.visibled
    });
  }

  private _handleClickLabelListItem(event: React.MouseEvent<HTMLElement>, labelListItemProps: any): void {
    this.context.move(`/labels/${labelListItemProps.label.id}/edit`);
  }

  private _handleClickDestroyButton(event: React.MouseEvent<HTMLElement>, labelListItemProps: any): void {
    event.stopPropagation();

    this.actions.destroyLabel(labelListItemProps.label);
  }
}
