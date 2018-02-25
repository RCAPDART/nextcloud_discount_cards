import {Component} from 'react';
import style from './card.less';

export class Card extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		const {data} = this.props;
		return (
			<li className = "card">
				<h3 className = "title"> {data.title} </h3>
				<a href = {data.link}> Link </a>
			</li>
		);
	}
}