import {Component} from 'react';
import style from './orderItem.less';

export class OrderItem extends Component {
	onOrderChange () {
		this.props.onOrderChangeCallback(this.props.orderKey);
	}
	
	getOrderingClass() {
		return this.props.getItemClassState(this.props.orderKey);
	}
	
	render () {
		return (
			<div className = 'orderLink' onClick = {this.onOrderChange.bind(this)}>
				<span className = 'name unselectable'>{this.props.title}</span>
				<span className = {'sort-indicator unselectable ' + this.getOrderingClass()}></span>
			</div>
		);
	}
}