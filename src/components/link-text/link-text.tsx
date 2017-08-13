import * as PropTypes from 'prop-types';
import * as React from 'react';

export class LinkText extends React.Component<any, any> {
  private static propTypes = {
    children: PropTypes.string.isRequired,
  };

  handleClick(event: any) {
    event.stopPropagation();
  }
  render() {
    const pattern = /((?:https?:|ftp:|)\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
    const texts = this.props.children.split(pattern).filter((text: string) => Boolean(text.trim()));

    const textElements = texts.map((text: string, index: number) => {
      if (text.match(pattern) !== null) {
        return <a key={index} href={text} onClick={(event: any) => this.handleClick(event)} target="_blank" rel="noopener noreferrer">{text}</a>;
      }
      return text;
    });

    return <span>{textElements}</span>;
  }
}
