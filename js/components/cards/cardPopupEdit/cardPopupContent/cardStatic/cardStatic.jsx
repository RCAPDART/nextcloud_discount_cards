import Chip from 'material-ui/Chip';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Barcode } from '../../../../common/barcode/barcode';
import { CommonService } from '../../../../../services/commonService';
import { Container } from '../../../../../baseComponents/container/container';
import { DimensionHelper } from '../../../../../services/dimensionHelper';
import { StyleService } from '../../StyleService';

export class CardStatic extends Component {
  static propTypes = {
    card: PropTypes.object.isRequired,
    modalWidth: PropTypes.number.isRequired
  };

  constructor (props) {
    super(props);
    this.id = CommonService.GetGuid();
  }

  render () {
    const { card, modalWidth } = this.props;
    const chipStyles = StyleService.GetChipStyles();
    const imageStyle = StyleService.GetImageStyle(card.image);
    const imageDataStyle = StyleService.GetImageDataStyle(card.color,
      DimensionHelper.GetCardImageHeight(modalWidth));
    const id = this.id;

    return (
      <Container className='cardPopup'>
        <Container className='imageData'
          style={imageDataStyle}>
          <Container className='image'
            style={imageStyle} />
        </Container>
        <Container className='chipTags'> {
          card.tags.map((item) =>
            <Chip className='chipTag' key={item}
              style={chipStyles}>
              {item}
            </Chip>
            , this)}
        </Container>
        <Container className='barcodeData'>
          <Barcode code={card.code} codeType={card.codeType} id={id} />
        </Container>
      </Container>
    );
  }
}
