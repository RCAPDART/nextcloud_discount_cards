import { Component } from 'react';
import { OrderItem } from './orderItem/orderItem.js';
import style from './orderingPanel.less';

export class OrderingPanel extends Component {
	state = {
		orderKey: this.props.orderKey,
		ascending: this.props.ascending
	};
	
	constructor(props) {
		super(props);
		this.callback = this.props.callback;
		this.orderAscIconClass = 'icon-triangle-n';
		this.orderDescIconClass = 'icon-triangle-s';
		this.orderKeys = this.props.orderKeys;
	}
	
	onOrderChange (orderKey) {
		let ascending = this.state.ascending;
		if (orderKey == this.state.orderKey){
			ascending = !ascending;
		}
		else{
			ascending = true;
		}
		this.setState({
			ascending: ascending,
			orderKey: orderKey
		});
		this.props.callback(orderKey, ascending);
	}
	
	getOrderingClass(orderKey) {
		let orderClass = '';
		if (orderKey == this.state.orderKey) {
			if (this.state.ascending){
				orderClass = this.orderAscIconClass;
			}
			else{
				orderClass = this.orderDescIconClass;
			}			
		}

		return orderClass;
	}

	render () {
		return (		
			<div className = 'orderingPanel'>
				{ 
					this.orderKeys.map((orderKey) => 
						<OrderItem 
							key = {orderKey.id} 
							title = {orderKey.title} 
							orderKey = {orderKey.key}
							onOrderChangeCallback = {(orderKey) => this.onOrderChange(orderKey)}
							getItemClassState = {(orderKey) => this.getOrderingClass(orderKey)}							
						/>
					) 
				}
			</div>
		);
	}
}