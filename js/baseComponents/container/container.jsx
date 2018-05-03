import React, {Component} from 'react';
import './container.less';
import PropTypes from "prop-types";

export class Container extends Component {

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        className: PropTypes.string,
        style: PropTypes.any,
        onClick: PropTypes.func
    };

    style = null;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.className} style={this.props.style} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}