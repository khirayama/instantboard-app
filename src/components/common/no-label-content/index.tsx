import * as PropTypes from 'prop-types';
import * as React from 'react';
import FloatingButton from '../../floating-button';

export default class NoLabelContent extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleClickCreateLabelButton: any;

  constructor(props: any) {
    super(props);

    this.handleClickCreateLabelButton = this._handleClickCreateLabelButton.bind(this);
  }

  public render() {
    return (
      <div className="no-label-content">
        <div className="no-label-content--inner">
          <p>You have no labels.<br/>Create category of task as label.</p>
          <FloatingButton onClick={this.handleClickCreateLabelButton}>CREATE LABEL</FloatingButton>
        </div>
      </div>
    );
  }

  private _handleClickCreateLabelButton() {
    this.context.move('/labels/new');
  }
}
