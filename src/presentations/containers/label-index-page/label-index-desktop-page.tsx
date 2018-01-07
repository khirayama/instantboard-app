import * as PropTypes from 'prop-types';
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
import ApplicationContent from '../../components/application-header/application-content';
import ApplicationHeader from '../../components/application-header/application-header';
import IconLink from '../../components/icon-link';
import Indicator from '../../components/indicator';
import LabelListItem from '../../components/label-list-item';
import List from '../../components/list/list';
import LoadingContent from '../../components/loading-content';
import NoLabelContent from '../../components/no-label-content';
import Container from '../container';

export default class LabelIndexDesktopPage extends Container<{}, IState> {
  public static contextTypes: {move: any} = {
    move: PropTypes.func,
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
        return pollRequest(this.dispatch, {status: 'pending'});
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

    this.handleSortLabelList = this._handleSortLabelList.bind(this);
    this.handleClickVisibleButton = this._handleClickVisibleButton.bind(this);
    this.handleClickLabelListItem = this._handleClickLabelListItem.bind(this);
    this.handleClickDestroyButton = this._handleClickDestroyButton.bind(this);
  }

  public componentDidMount() {
    this.actions.fetchLabel();
    this.actions.pollRequest();
    poller.add(this.actions.pollRequest, 3000);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();

    poller.remove(this.actions.pollRequest);
  }

  public render() {
    const labels: ILabel[] = this.state.labels;
    const requests: IRequest[] = this.state.requests;
    const ui: IUI = this.state.ui;

    let backgroundElement: React.ReactNode|null = null;
    if (ui.isLoadingLabels && labels.length === 0) {
      backgroundElement = <LoadingContent/>;
    } else if (!ui.isLoadingLabels && labels.length === 0) {
      backgroundElement = <NoLabelContent/>;
    }

    const badges: number[] = (requests.length) ? [2] : [];

    const parentElement: Element|null = window.document.querySelector('.tab-navigation-content');

    return (
      <section key="label-index-desktop-page" className="page label-index-desktop-page">
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
            {labels.map((label: ILabel): React.ReactNode => (
              <LabelListItem
                key={label.id}
                label={label}
                onClickVisibleButton={this.handleClickVisibleButton}
                onClickLabelListItem={this.handleClickLabelListItem}
                onClickDestroyButton={this.handleClickDestroyButton}
              />
            ))}
          </List>
          {(labels.length === 0) ? null : (
            <IconLink
              to="/labels/new"
              iconType="add"
              className="label-index-desktop-page--add-button"
            >
              {'ADD LABEL'}
            </IconLink>
          )}
          {backgroundElement}
        </ApplicationContent>
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
      visibled: !labelListItemProps.label.visibled,
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
