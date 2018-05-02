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
        style: PropTypes.object,
        onClick: PropTypes.func
    };

    style = null;

    constructor(props) {
        super(props);
        if(this.props.style != null)
            this.style = this.props.style;
    }

    render() {
        return (
            <div className={this.props.className} style={this.style} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}