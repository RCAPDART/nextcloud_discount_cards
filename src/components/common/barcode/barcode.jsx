import bwipjs from 'bwip-js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container } from '../../../baseComponents/container/container';

import './barcode.scss';

const defaultType = 'code128';
const defaultScale = 10;
const defaultHeight = 5;
const idPrefix = 'barcode_';
const defaultCode = '0000000000000000';

export class Barcode extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    codeType: PropTypes.string.isRequired,
    type: PropTypes.string,
    scale: PropTypes.number,
    height: PropTypes.number,
    showText: PropTypes.bool,
    textColor: PropTypes.string,
  };

  state = {
    code: '',
    codeType: '',
  };

  componentDidMount() {
    this.TrySetBarcode();
  }

  componentDidUpdate() {
    this.TrySetBarcode();
  }

  TrySetBarcode() {
    if (
      this.state.code !== this.props.code ||
      this.state.codeType !== this.props.codeType
    ) {
      this.SetBarcode();
      this.setState({ code: this.props.code, codeType: this.props.codeType });
    }
  }

  SetBarcode() {
    bwipjs(
      this.props.id,
      {
        bcid: this.props.codeType != null ? this.props.codeType : defaultType,
        text: this.props.code != null ? this.props.code : defaultCode,
        scale: this.props.scale != null ? this.props.scale : defaultScale,
        height: this.props.height != null ? this.props.height : defaultHeight,
        includetext: false,
      },
      function () {}
    );
  }

  GetText() {
    const groups = this.props.code.match(/.{1,4}/g);
    let result = '';
    for (const index in groups) {
      result += groups[index] + '-';
    }
    return result.substr(0, result.length - 1);
  }

  render() {
    const { id, textColor, showText } = this.props;
    const text = this.GetText();

    return (
      <Container className="barcode" id={idPrefix + id}>
        <canvas className="barcodeCanvas" id={id} />
        <h2
          style={{ color: textColor }}
          className={(showText == null ? true : showText) ? '' : 'hide'}>
          {text}
        </h2>
      </Container>
    );
  }
}
