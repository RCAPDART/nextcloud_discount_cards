import {Component} from 'react';
import {CardsService} from '../../services/cardsService.js';
import {Cards} from '../cards/cards.js';
import style from './mainContent.less';

export class MainContent extends Component {
	constructor(props) {
		super(props);
		this.cardsService = new CardsService();
		this.cards = this.cardsService.GetCards();
	}
	render () {
		return (
			<div>
				<span>Content page: {this.cardsService.GetName(this.props.name)}</span>
				<Cards data={this.cards}/>
			</div>
		);
	}
}