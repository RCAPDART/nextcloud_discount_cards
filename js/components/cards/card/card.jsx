import React, {Component} from 'react';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import PropTypes from 'prop-types';
import './card.less';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridTile: {
    },
};

export class Card extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        openCardCallback: PropTypes.func
    }

	constructor(props) {
		super(props);
	}

    openCard () {
		if(this.props.openCardCallback===null || this.props.openCardCallback===undefined)
			return;
        this.props.openCardCallback(this.props.data.id);
    }

	render () {
		const {data} = this.props;
		return (
            <GridTile
                onClick = {this.openCard.bind(this)}
				key = {data.img}
				cols={1}
				rows={1}
                titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
				title = {data.title}
				style ={styles.gridTile}
				subtitle = {''}
				actionIcon = {<IconButton><StarBorder color="white" /></IconButton>}
			>
				<img src = {data.img} />
			</GridTile>
		);
	}
}