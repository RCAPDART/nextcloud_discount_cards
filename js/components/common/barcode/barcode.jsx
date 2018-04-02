import React, {Component} from 'react';
import PropTypes from 'prop-types';
import bwipjs from 'bwip-js';
import './barcode.less';

const defaultType = 'code128';
const defaultScale = 4;
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
    }

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
        }, function (a, b) {
            window.console.log(a);
            window.console.log(b);
        });
    }

    GetText() {
        const groups = this.props.code.match(/.{1,2}/g);
        let result = '';
        for (let index in groups) {
            result += groups[index] + '-';
        }
        return result.substr(0, result.length - 1);
    }

    render() {
        return (
            <div id={idPrefix + this.props.id}>
                <canvas id={this.props.id}></canvas>
                <h2 className={(this.props.showText == null ? true : this.props.showText) ? '' : 'hide'}>
                    {this.GetText()}
                </h2>
            </div>
        );
    }
}