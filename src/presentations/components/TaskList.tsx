import List from 'presentations/components/List';
import * as React from 'react';

export class TaskList extends React.Component<any, any> {
  public render(): any {
    const { children, onSort } = this.props;
    const handleSort: any = (fromIndex: number, toIndex: number): void => {
      if (onSort) {
        onSort(fromIndex, toIndex, this.props, this.state);
      }
    };

    const props: any = { ...this.props };
    delete props.tasks;
    delete props.onSort;

    return (
      <List {...props} onSort={handleSort}>
        {children}
      </List>
    );
  }
}
