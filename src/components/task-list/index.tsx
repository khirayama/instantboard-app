import * as React from 'react';
import List from '../atoms/list/list';

export default class TaskList extends React.Component<any, any> {
  public render() {
    const props = Object.assign({}, this.props);

    const handleSort = (from: number, to: number) => {
      if (this.props.onSort) {
        this.props.onSort(from, to, this.props, this.state);
      }
    };

    delete props.tasks;
    delete props.onSort;

    return (
      <List
        {...props}
        onSort={handleSort}
      >{this.props.children}</List>
    );
  }
}
