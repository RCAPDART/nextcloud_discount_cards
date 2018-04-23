import React, {Component} from 'react';
import './orderItem.less';
import PropTypes from "prop-types";
import {Container} from "../../../../baseComponents/container/container";

export class OrderItem extends Component {
    static propTypes = {
        orderKey: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onOrderChangeCallback: PropTypes.func.isRequired,
        getItemClassState: PropTypes.func.isRequired
    }

	onOrderChange () {
		this.props.onOrderChangeCallback(this.props.orderKey);
	}
	
	getOrderingClass() {
		return this.props.getItemClassState(this.props.orderKey);
	}
	
	render () {
		return (
			<Container className = 'orderLink' onClick = {this.onOrderChange.bind(this)}>
				<span className = 'name unselectable'>{this.props.title}</span>
				<span className = {'sort-indicator unselectable ' + this.getOrderingClass()}></span>
			</Container>
		);
	}
}