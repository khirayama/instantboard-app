import List from 'presentations/components/List';
import * as React from 'react';

export default class TaskList extends React.Component<any, any> {
  public render() {
    const { children, onSort } = this.props;
    const handleSort = (from: number, to: number) => {
      if (onSort) {
        onSort(from, to, this.props, this.state);
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
