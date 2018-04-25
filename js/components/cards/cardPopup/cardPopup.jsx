import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './cardPopup.less';
import {Barcode} from "../../common/barcode/barcode";
import {CommonService} from "../../../services/commonService";
import {Container} from "../../../baseComponents/container/container";
import {DimensionHelper} from "../../../services/dimensionHelper";
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Done from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';

export class CardPopup extends Component {
    static propTypes = {
        card: PropTypes.object.isRequired,
        screenWidth: PropTypes.number
    };
    id = '';

    state = {
        card: this.props.card,
        edit: false,
    };

    constructor(props) {
        super(props);
        this.dimensionHelper = new DimensionHelper();
        const commonService = new CommonService();
        this.id = commonService.GetGuid();
    }

    getImageDataStyle() {
        return {
            background: this.state.card.color,
            height: this.dimensionHelper.GetCardImageHeight(this.props.screenWidth) + 'vh'
        };
    }

    toggleEdit(){
        const currentState = this.state.edit;
        this.setState({edit: !currentState});
    }

    imageStyle = {
        backgroundSize: 'cover',
        background: 'url("' + this.state.card.img + '") scroll no-repeat center/cover'
    };

    render() {
        function DrawButtons(props) {
            if(props.edit){
                return <IconButton className='editButton' onClick = {props.toggleEdit}>
                    <Done color={props.textColor}/>
                </IconButton>
            }
            else{
                return <IconButton className='editButton' onClick = {props.toggleEdit}>
                    <ModeEdit color={props.textColor}/>
                </IconButton>
            }
        }
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
                        <DrawButtons
                            textColor={props.card.textColor}
                            edit={props.edit}
                            toggleEdit={props.toggleEdit}/>
                    </Container>
                </Container>
            }
            return <span/>;
        }

        return (
            <RenderCard card={this.state.card}
                        edit={this.state.edit}
                        imageDataStyle={this.getImageDataStyle()}
                        imageStyle={this.imageStyle} id={this.id}
                        toggleEdit={this.toggleEdit.bind(this)}
            />
        );
    }
}