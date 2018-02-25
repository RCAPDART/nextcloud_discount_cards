import React, {Component} from 'react';
import {CardsService} from '../../services/cardsService.js';
import {Cards} from '../cards/cards.jsx';
import './mainContent.less';

export class MainContent extends Component {
	constructor(props) {
		super(props);
		this.cardsService = new CardsService();
		this.cards = this.cardsService.GetCards();
	}
	render () {
		return (
			<div>
				<Cards data={this.cards}/>
			</div>
		);
	}
}