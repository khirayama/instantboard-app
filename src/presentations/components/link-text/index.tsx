import * as React from 'react';

export default class LinkText extends React.Component<any, any> {
  private handleClick: any;

  constructor(props: any) {
    super(props);

    this.handleClick = this._handleClick.bind(this);
  }

  public render() {
    const pattern = /((?:https?:|ftp:|)\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
    const {children}: {children?: any} = this.props;
    const texts = children.split(pattern).filter((text: string) => Boolean(text.trim()));

    const textElements = texts.map((text: string) => {
      if (text.match(pattern) !== null) {
        return (
          <a
            key={Math.random()}
            href={text}
            target="_blank"
            rel="noopener noreferrer"
            className="link-text"
            onClick={this.handleClick}
          >
            {text}
          </a>
        );
      }
      return text;
    });

    return (
      <span>
        {textElements}
      </span>
    );
  }

  private _handleClick(event: any) {
    event.stopPropagation();
  }
}
