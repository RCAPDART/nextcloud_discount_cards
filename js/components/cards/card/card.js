import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './card.less';

export class Card extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
    }

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