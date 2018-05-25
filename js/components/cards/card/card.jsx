import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import { CommonService } from "../../../services/commonService";
import { GridTile } from 'material-ui/GridList';
import { StyleService } from './StyleService';

import './card.less';
import {Container} from "../../../baseComponents/container/container";

export class Card extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        openCardCallback: PropTypes.func
    };

	constructor(props) {
		super(props);
        this.commonService = new CommonService();
        this.styleService = new StyleService();
	}

	getRGB(){
		return CommonService.HexToRgb(this.props.data.color);
	}

    openCard () {
		if(this.props.openCardCallback===null || this.props.openCardCallback===undefined)
			return;
        this.props.openCardCallback(this.props.data.id);
    }

    getTileStyle() {
		return {
            titleStyle: {
                color: this.props.data.textColor,
                fontWeight: 'bold'
            }
		}
	}

	getImageStyle() {
		return {
            background: 'url("' + this.props.data.img + '") scroll no-repeat center/cover'
        }
	}

	render () {
        const { data } = this.props;
		function RenderCardImage () {
			if(data.id !== 0 ) return null;
			return <div className='newCardIcon'>
                <IconButton><AddCircleOutline/></IconButton>
			</div>
        }
		return (
            <GridTile
				key = {data.img}
				cols={1}
				rows={1}
                titleBackground = {
					'linear-gradient(to bottom, ' +
					'rgba('+this.getRGB().r+','+this.getRGB().g+','+this.getRGB().b+',0.9) 0%, ' +
                    'rgba('+this.getRGB().r+','+this.getRGB().g+','+this.getRGB().b+',0.5) 70%, ' +
                    'rgba('+this.getRGB().r+','+this.getRGB().g+','+this.getRGB().b+',0) 100%)'
                }
				title = {data.title}
                titleStyle = {this.getTileStyle().titleStyle}
				subtitle = {''}
			>
				<Container className = 'chipTags'>
					{this.props.data.tags.map((item) =>
							<Chip className = 'chipTag' key = {item.id} style={this.styleService.GetChipStyles()}>
								{item.title}
							</Chip>
						,this)}
				</Container>
				<Container
					style = {this.getImageStyle()}
                    onClick = {this.openCard.bind(this)}
					className = 'cardImage'/>
				<RenderCardImage/>
			</GridTile>
		);
	}
}