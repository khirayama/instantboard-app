import * as React from 'react';

import { List } from 'presentations/components/List';

export class TaskList extends React.Component<any, any> {
  private onSort: any;

  constructor(props: any) {
    super(props);

    this.onSort = this.handleSort.bind(this);
  }

  public render(): JSX.Element {
    const { children } = this.props;

    const props: any = { ...this.props };
    delete props.tasks;
    delete props.onSort;

    return (
      <List {...props} onSort={this.onSort}>
        {children}
      </List>
    );
  }

  private handleSort(fromIndex: number, toIndex: number): void {
    const { onSort } = this.props;

    if (onSort) {
      onSort(fromIndex, toIndex, this.props, this.state);
    }
  }
}
