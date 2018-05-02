import * as PropTypes from 'prop-types';
import * as React from 'react';

interface ISheetProps {
  isShown: boolean;
}

export class Sheet extends React.Component<ISheetProps, {}> {
  public render(): JSX.Element | null {
    const isShown: boolean = this.props.isShown;

    return isShown ? (
      <div className="sheet">
        <div className="sheet--content">{this.props.children}</div>
      </div>
    ) : null;
  }
}
