import Chip from 'material-ui/Chip';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Barcode } from '../../../common/barcode/barcode';
import { CommonService } from '../../../../services/commonService';
import { Container } from '../../../../baseComponents/container/container';
import { DimensionHelper } from '../../../../services/dimensionHelper';
import { StyleService } from '../StyleService';

export class CardStatic extends Component {
  static propTypes = {
    card: PropTypes.object.isRequired,
    modalWidth: PropTypes.number.isRequired
  };

  constructor (props) {
    super(props);
    this.styleService = new StyleService();
    this.dimensionHelper = new DimensionHelper();
  }

  render () {
    const chipStyles = this.styleService.GetChipStyles();
    const imageStyle = this.styleService.GetImageStyle(this.props.card.image);
    const imageDataStyle = this.styleService.GetImageDataStyle(this.props.card.color,
      this.dimensionHelper.GetCardImageHeight(this.props.modalWidth));
    const id = CommonService.GetGuid();

    return (
      <Container className='cardPopup'>
        <Container className='imageData'
          style={imageDataStyle}>
          <Container className='image'
            style={imageStyle} />
        </Container>
        <Container className='chipTags'> {
          this.props.card.tags.map((item) =>
            <Chip className='chipTag' key={item}
              style={chipStyles}>
              {item}
            </Chip>
            , this)}
        </Container>
        <Container className='barcodeData'>
          <Barcode code={this.props.card.code} id={id} />
        </Container>
      </Container>
    );
  }
}
