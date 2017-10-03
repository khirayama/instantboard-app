import * as PropTypes from 'prop-types';
import * as React from 'react';
import FlatButton from '../../components/flat-button';
import Icon from '../../components/Icon';

export default class NoTaskContent extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickAddTaskButton: any;

  constructor(props: any) {
    super(props);

    this.handleClickAddTaskButton = this._handleClickAddTaskButton.bind(this);
  }

  public render() {
    return (
      <div className="no-task-content">
        <FlatButton onClick={this.handleClickAddTaskButton}>
          <Icon type="add"/>
          <span>ADD TASK</span>
        </FlatButton>
      </div>
    );
  }

  private _handleClickAddTaskButton() {
    const label = this.props.label;

    this.context.move(`/tasks/new?label-id=${label.id}`);
  }
}
