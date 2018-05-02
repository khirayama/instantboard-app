import * as PropTypes from 'prop-types';
import * as React from 'react';

interface ISheetState {
  isShown: boolean;
}

interface ISheetProps {
  isShown: boolean;
}

export class Sheet extends React.Component<ISheetProps, ISheetState> {
  constructor(props: ISheetProps) {
    super(props);

    this.state = {
      isShown: this.props.isShown,
    };
  }

  public render(): JSX.Element | null {
    const isShown: boolean = this.state.isShown;

    return isShown ? (
      <div className="sheet">
        <div className="sheet--content">{this.props.children}</div>
      </div>
    ) : null;
  }
}
