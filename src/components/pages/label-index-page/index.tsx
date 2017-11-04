import * as classNames from 'classnames';
import * as React from 'react';
import poller from '../../../utils/poller';
import Indicator from '../../atoms/indicator';
import List from '../../atoms/list/list';
import ListItem from '../../atoms/list/list-item';
import IconLink from '../../molecules/icon-link';
import LabelListItem from '../../molecules/label-list-item';
import LoadingContent from '../../molecules/loading-content';
import TabNavigation from '../../molecules/tab-navigation/tab-navigation';
import TabNavigationContent from '../../molecules/tab-navigation/tab-navigation-content';
import NoLabelContent from '../../organisms/no-label-content';

export default class LabelIndexPage extends React.Component<any, any> {
  private handleSortLabelList: any;

  constructor(props: any) {
    super(props);

    this.handleSortLabelList = this._handleSortLabelList.bind(this);
  }

  public componentDidMount() {
    this.props.actions.fetchLabel();
    poller.add(this.props.actions.pollRequest, 5000);
  }

  public componentWillUnmount() {
    poller.remove(this.props.actions.pollRequest);
  }

  public render() {
    const ui = this.props.ui;
    const labels = this.props.labels;
    const requests = this.props.requests;

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
                  actions={this.props.actions}
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
    const labels = this.props.labels;
    const label = labels[from];

    if (label.priority !== to) {
      this.props.actions.sortLabel(label, to);
    }
  }
}
