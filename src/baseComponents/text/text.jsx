import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './text.scss';

export class Text extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    isTitle: PropTypes.bool,
    isInline: PropTypes.bool,
    fontSize: PropTypes.number,
    align: PropTypes.string
  };

  isTitle = false;
  isInline = true;
  align = 'left';
  fontSize = '14px';

  constructor (props) {
    super(props);
    if (this.props.isTitle != null)
      this.isTitle = this.props.isTitle;

    if (this.props.isInline != null)
      this.isInline = this.props.isInline;

    if (this.props.align != null)
      this.align = this.props.align;

    if (this.props.fontSize != null)
      this.fontSize = this.props.fontSize;
  }

  render () {
    function GetText (props) {
      if (props.isInline) {
        return <span>{this.props.children}</span>
      }
      if (props.isTitle) {
        return <h1>{this.props.children}</h1>
      }
      return <p>{this.props.children}</p>;
    }

    return (
      <div>
        <GetText
          isTitle={this.isTitle}
          isInline={this.isInline}
          align={this.align}
          fontSize={this.fontSize}
        >
          {this.props.children}
        </GetText>
      </div>
    );
  }
}
