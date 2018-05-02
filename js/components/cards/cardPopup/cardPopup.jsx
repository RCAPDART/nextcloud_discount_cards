import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './cardPopup.less';
import {Barcode} from "../../common/barcode/barcode";
import {CommonService} from "../../../services/commonService";
import {Container} from "../../../baseComponents/container/container";
import {DimensionHelper} from "../../../services/dimensionHelper";
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Clear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import {CardEditor} from "./cardEditor/cardEditor";

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

    applyEditChanges(updatedCard){
        this.setState({card: updatedCard});
        this.toggleEdit();
    }

    imageStyle = {
        backgroundSize: 'cover',
        background: 'url("' + this.state.card.img + '") scroll no-repeat center/cover'
    };

    render() {
        function DrawButtons(props) {
            if(props.edit){
                return <IconButton className='editButton' onClick = {props.toggleEdit}>
                    <Clear color={props.textColor}/>
                </IconButton>
            }
            else{
                return <IconButton className='editButton' onClick = {props.toggleEdit}>
                    <ModeEdit color={props.textColor}/>
                </IconButton>
            }
        }
        function DrawCard(props) {
            if (!props.edit) {
                return <Container className='cardPopup'>
                    <Container className='imageData' style={props.imageDataStyle}>
                        <Container className='image' style={props.imageStyle}/>
                    </Container>
                    <Container className='barcodeData'>
                        <Barcode code={props.card.code} id={props.id}/>
                    </Container>
                </Container>
            }
            else {
                return <CardEditor card={props.card} callBack={props.editCallback}/>
            }
        }
        function RenderCard(props) {
            if (props.card != null) {
                return <Container>
                    <DrawCard
                        edit={props.edit}
                        imageDataStyle={props.imageDataStyle}
                        imageStyle={props.imageStyle}
                        card={props.card}
                        id={props.id}
                        editCallback={props.editCallback}
                    />
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
                        editCallback={this.applyEditChanges.bind(this)}
                        toggleEdit={this.toggleEdit.bind(this)}
            />
        );
    }
}