import * as React from 'react';

export class LinkText extends React.Component<any, any> {
  private onClick: any;

  constructor(props: any) {
    super(props);

    this.onClick = this.handleClick.bind(this);
  }

  public render(): JSX.Element {
    const pattern: RegExp = /((?:https?:|ftp:|)\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
    const { children }: { children?: any } = this.props;
    const texts: string[] = children.split(pattern).filter((text: string) => Boolean(text.trim()));

    const textElements: (string | JSX.Element)[] = texts.map((text: string) => {
      if (text.match(pattern) !== null) {
        return (
          <a
            key={new Date().getTime()}
            href={text}
            target="_blank"
            rel="noopener noreferrer"
            className="link-text"
            onClick={this.onClick}
          >
            {text}
          </a>
        );
      }

      return text;
    });

    return <span>{textElements}</span>;
  }

  private handleClick(event: any): void {
    event.stopPropagation();
  }
}
