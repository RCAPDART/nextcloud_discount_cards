import React, { Component } from 'react';
import { Card } from './card/card.js';
import { OrderingPanel } from '../common/orderingPanel/orderingPanel.jsx';
import { CardsService } from '../../services/cardsService.js';
import './cards.less';
import PropTypes from "prop-types";

export class Cards extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }

	state = {
		cards: this.props.data
	};

	constructor(props) {
		super(props);
		this.cardsService = new CardsService();
		
		this.orderKeys = [			
			{
				id: 1,
				title: 'Custom',
				key: 'order'
			},
			{
				id: 2,
				title: 'Title',
				key: 'title'
			}
		];
	}

	reorderCards (orderKey, ascending) {
		const orderedCards = this.cardsService.OrderCards(this.state.cards, orderKey, ascending);
		this.setState({
			cards: orderedCards
		});
	}

	getOrderingClass(orderKey) {
		if (orderKey == this.state.orderKey) {
			if (this.state.ascending){
				return this.orderAscIconClass;
			}
			return this.orderDescIconClass;
		}
		return '';
	}

	render () {
		return (
			<div className = 'cards'>
				<OrderingPanel orderKey='order' ascending='true' 
				orderKeys={this.orderKeys}
				callback={(orderKey, ascending) => this.reorderCards(orderKey, ascending)} />
				<div className = 'cardsList'>
					{ this.state.cards.map((item) => <Card key={item.id} data = {item}/>) }
				</div>
			</div>
		);
	}
}