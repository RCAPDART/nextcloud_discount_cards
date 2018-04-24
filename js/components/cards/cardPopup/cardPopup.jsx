import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './cardPopup.less';
import {Barcode} from "../../common/barcode/barcode";
import {CommonService} from "../../../services/commonService";
import {Container} from "../../../baseComponents/container/container";
import {DimensionHelper} from "../../../services/dimensionHelper";
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconButton from 'material-ui/IconButton';

export class CardPopup extends Component {
    static propTypes = {
        card: PropTypes.object.isRequired,
        screenWidth: PropTypes.number
    };
    id = '';

    constructor(props) {
        super(props);
        this.dimensionHelper = new DimensionHelper();
        const commonService = new CommonService();
        this.id = commonService.GetGuid();
        this.setState({edit:false});
    }

    getImageDataStyle() {
        return {
            background: this.props.card.color,
            height: this.dimensionHelper.GetCardImageHeight(this.props.screenWidth) + 'vh'
        };
    }

    toggleEdit(){
        const currentState = this.state.edit;
        this.setState({edit: !currentState});
    }

    imageStyle = {
        backgroundSize: 'cover',
        background: 'url("' + this.props.card.img + '") scroll no-repeat center/cover'
    };

    render() {
        function RenderCard(props) {
            if (props.card != null) {
                return <Container>
                    <Container className='cardPopup'>
                        <Container className='imageData' style={props.imageDataStyle}>
                            <Container className='image' style={props.imageStyle}/>
                        </Container>
                        <Container className='barcodeData'>
                            <Barcode code={props.card.code} id={props.id}/>
                        </Container>
                    </Container>
                    <Container className='buttons'>
                        <IconButton><ModeEdit color={props.card.textColor}/></IconButton>
                    </Container>
                </Container>
            }
            return <span/>;
        }

        return (
            <RenderCard card={this.props.card}
                        imageDataStyle={this.getImageDataStyle()}
                        imageStyle={this.imageStyle} id={this.id}/>
        );
    }
}