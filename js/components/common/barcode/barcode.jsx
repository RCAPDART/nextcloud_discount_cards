import React, {Component} from 'react';
import PropTypes from 'prop-types';
import bwipjs from 'bwip-js';
import './barcode.less';
import {Container} from "../../../baseComponents/container/container";

const defaultType = 'code128';
const defaultScale = 10;
const defaultHeight = 5;
const idPrefix = 'barcode_';
const defaultCode = '0000000000000000';

export class Barcode extends Component {
    static propTypes = {
        code: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        type: PropTypes.string,
        scale: PropTypes.number,
        height: PropTypes.number,
        showText: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        bwipjs(this.props.id, {
            bcid: this.props.type != null ? this.props.type : defaultType,
            text: this.props.code != null ? this.props.code : defaultCode,
            scale: this.props.scale != null ? this.props.scale : defaultScale,
            height: this.props.height != null ? this.props.height : defaultHeight,
            includetext: false,
        }, function () {
        });
    }

    GetText() {
        const groups = this.props.code.match(/.{1,4}/g);
        let result = '';
        for (let index in groups) {
            result += groups[index] + '-';
        }
        return result.substr(0, result.length - 1);
    }

    render() {
        return (
            <Container className='barcode' id={idPrefix + this.props.id}>
                <canvas className='barcodeCanvas' id={this.props.id}></canvas>
                <h2 className={(this.props.showText == null ? true : this.props.showText) ? '' : 'hide'}>
                    {this.GetText()}
                </h2>
            </Container>
        );
    }
}