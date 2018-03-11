import React, {Component} from 'react';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import PropTypes from 'prop-types';
import './card.less';
import {CommonService} from "../../../services/commonService";

export class Card extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        openCardCallback: PropTypes.func
    }

	constructor(props) {
		super(props);
        const commonService = new CommonService();
		this.rgbBack = commonService.HexToRgb(props.data.color);
		this.invertedColor = commonService.InvertColor(props.data.color);
	}

    openCard () {
		if(this.props.openCardCallback===null || this.props.openCardCallback===undefined)
			return;
        this.props.openCardCallback(this.props.data.id);
    }

    getTileStyle() {
		return {
            titleStyle: {
                color: this.invertedColor,
                fontWeight: 'bold'
            }
		}
	}

	render () {
		const {data} = this.props;
		return (
            <GridTile
				key = {data.img}
				cols={1}
				rows={1}
                titleBackground = {
					'linear-gradient(to bottom, ' +
					'rgba('+this.rgbBack.r+','+this.rgbBack.g+','+this.rgbBack.b+',0.9) 0%, ' +
                    'rgba('+this.rgbBack.r+','+this.rgbBack.g+','+this.rgbBack.b+',0.5) 70%, ' +
                    'rgba('+this.rgbBack.r+','+this.rgbBack.g+','+this.rgbBack.b+',0) 100%)'
                }
				title = {data.title}
                titleStyle = {this.getTileStyle().titleStyle}
				subtitle = {''}
				actionIcon = {<IconButton><StarBorder color={this.invertedColor} /></IconButton>}
			>
				<img
                    onClick = {this.openCard.bind(this)}
					className = 'cardImage'
					src = {data.img} />
			</GridTile>
		);
	}
}