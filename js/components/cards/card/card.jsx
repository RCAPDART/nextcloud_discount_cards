import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import { CommonService } from '../../../services/commonService';
import { Container } from '../../../baseComponents/container/container';
import { GridTile } from 'material-ui/GridList';
import { StyleService } from './StyleService';

import './card.less';

export class Card extends Component {
  static propTypes = {
    card: PropTypes.object.isRequired,
    openCardCallback: PropTypes.func
  };

  constructor (props) {
    super(props);
    this.openCardCallback = this.openCardCallback.bind(this);
  }

  openCardCallback () {
    if (this.props.openCardCallback === null || this.props.openCardCallback === undefined) {
      return;
    }

    this.props.openCardCallback(this.props.card.id);
  }

  render () {
    const { card } = this.props;
    const openCardCallback = this.openCardCallback;
    const rgbColor = CommonService.HexToRgb(card.color);

    function RenderCardImage () {
      if (card.id !== 0) return <span />;
      return <div className='newCardIcon'>
        <IconButton><AddCircleOutline /></IconButton>
      </div>
    }

    return (
      <GridTile
        key={card.image}
        cols={1}
        rows={1}
        titleBackground={
          'linear-gradient(to bottom, ' +
          'rgba(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ',0.9) 0%, ' +
          'rgba(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ',0.5) 70%, ' +
          'rgba(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ',0) 100%)'
        }
        title={card.title}
        titleStyle={StyleService.GetTileStyle(card.textColor)}
        subtitle={''}
      >
        <Container className='chipTags'>
          {card.tags.map((item) =>
            <Chip className='chipTag' key={item} style={StyleService.GetChipStyles()}>
              {item}
            </Chip>
            , this)}
        </Container>
        <Container
          style={StyleService.GetImageStyle(card.image)}
          onClick={openCardCallback}
          className='cardImage' />
        <RenderCardImage />
      </GridTile>
    );
  }
}
