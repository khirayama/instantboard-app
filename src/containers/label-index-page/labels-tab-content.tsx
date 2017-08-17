import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import Icon from '../../components/fundamental/icon';
import {
  List,
  ListItem,
} from '../../components/fundamental/list';

export class LabelsTabContent extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleSortLabelList: any;

  constructor(props: any) {
    super(props);

    this.handleSortLabelList = this._handleSortLabelList.bind(this);
  }

  public render() {
    const labels = this.props.labels;
    const actions = this.props.actions;

    return (labels.length) ? (
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
    );
  }

  private _handleSortLabelList(from: number, to: number) {
    const labels = this.props.labels;
    const actions = this.props.actions;

    const label = labels[from];
    actions.sortLabel(label.cid, to);
  }
}
