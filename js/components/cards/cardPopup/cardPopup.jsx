import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './cardPopup.less';
import FlatButton from 'material-ui/FlatButton';
import {Barcode} from "../../common/barcode/barcode";
import {CommonService} from "../../../services/commonService";
import {Container} from "../../../baseComponents/container/container";

export class CardPopup extends Component {
    static propTypes = {
        card: PropTypes.object.isRequired
    };

    id = '';

    constructor(props) {
        super(props);
        const commonService = new CommonService();
        this.id = commonService.GetGuid();
    }

    imageDataStyle = {
        background: this.props.card.color
    };

    imageStyle = {
        backgroundSize: 'cover',
        background: 'url("' + this.props.card.img + '") scroll no-repeat center/cover'
    };

    render() {
        function RenderCard(props) {
            if (props.card != null) {
                return <Container className='cardPopup'>
                    <Container className='imageData' style={props.imageDataStyle}>
                        <Container className='image' style={props.imageStyle}></Container>
                    </Container>
                    <Container className='barcodeData'>
                        <Barcode code={props.card.code} id={props.id}/>
                    </Container>
                    <Container className='buttons'>
                        <FlatButton
                            key={1}
                            className='button'
                            label="Edit"
                            primary={true}
                        />
                        <FlatButton
                            key={2}
                            className='button'
                            label="Save"
                            primary={true}
                        />
                    </Container>
                </Container>
            }
            return <span/>;
        }

        return (
            <RenderCard card={this.props.card} imageDataStyle={this.imageDataStyle}
                        imageStyle={this.imageStyle} id={this.id}/>
        );
    }
}