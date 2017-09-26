import * as PropTypes from 'prop-types';
import * as React from 'react';
import FloatingButton from '../../components/floating-button';

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
        <div className="no-task-content--inner">
          <p>{'You\'re all done.'}</p>
          <FloatingButton onClick={this.handleClickAddTaskButton}>ADD TASK</FloatingButton>
        </div>
      </div>
    );
  }

  private _handleClickAddTaskButton() {
    const label = this.props.label;

    this.context.move(`/tasks/new?label-id=${label.id}`);
  }
}
