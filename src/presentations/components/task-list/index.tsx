import * as React from 'react';
import List from '../list/list';

export default class TaskList extends React.Component<any, any> {
  public render() {
    const handleSort = (from: number, to: number) => {
      if (this.props.onSort) {
        this.props.onSort(from, to, this.props, this.state);
      }
    };

    const props: any = Object.assign({}, this.props);
    delete props.tasks;
    delete props.onSort;

    return (
      <List
        {...props}
        onSort={handleSort}
      >{this.props.children}
      </List>
    );
  }
}
