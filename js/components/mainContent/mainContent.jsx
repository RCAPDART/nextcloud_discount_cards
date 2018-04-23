import React, {Component} from 'react';
import {CardsService} from '../../services/cardsService.js';
import {Cards} from '../cards/cards.jsx';
import './mainContent.less';
import {Container} from "../../baseComponents/container/container";

export class MainContent extends Component {
	constructor(props) {
		super(props);
		this.cardsService = new CardsService();
		this.cards = this.cardsService.GetCards();
	}
	render () {
		return (
			<Container>
				<Cards data={this.cards}></Cards>
			</Container>
		);
	}
}