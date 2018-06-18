import Clear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import { Barcode } from "../../common/barcode/barcode";
import { CardEditor } from "./cardEditor/cardEditor";
import { CommonService } from "../../../services/commonService";
import { Container } from "../../../baseComponents/container/container";
import { DimensionHelper } from "../../../services/dimensionHelper";

import './cardPopup.less';

export class CardPopup extends Component {
    static propTypes = {
        card: PropTypes.object.isRequired,
        applyColorChanges: PropTypes.func.isRequired,
        isEdit: PropTypes.bool.isRequired,
        screenWidth: PropTypes.number
    };
    id = '';

    constructor(props) {
        super(props);
        this.dimensionHelper = new DimensionHelper();
        this.id = CommonService.GetGuid();
    }

    getImageDataStyle() {
        return {
            background: this.props.card.color,
            height: this.dimensionHelper.GetCardImageHeight(this.props.screenWidth) + 'vh'
        };
    }

    toggleEdit(){
        this.applyChanges(this.props.card, !this.props.isEdit);
    }

    applyChanges(updateCard, isEdit){
        this.props.applyColorChanges(updateCard, isEdit);
    }

    applyEditChanges(updatedCard){
        this.setState({card: updatedCard});
        this.toggleEdit();
    }

    imageStyle = {
        backgroundSize: 'cover',
        background: 'url("' + this.props.card.image + '") scroll no-repeat center/cover'
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
                return <CardEditor card={props.card} callBack={props.editCallback}
                                   applyChanges={props.applyChanges}
                />
            }
        }
        function RenderCard(props) {
            if (props.card != null) {
                return <Container>
                    <Container className={'dialogTitle'}>
                        <h3 style={{color: props.card.textColor}}>{props.card.title}</h3>
                    </Container>
                    <DrawCard
                        edit={props.edit}
                        imageDataStyle={props.imageDataStyle}
                        imageStyle={props.imageStyle}
                        card={props.card}
                        id={props.id}
                        editCallback={props.editCallback}
                        applyChanges={props.applyChanges}
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
            <RenderCard card={this.props.card}
                        edit={this.props.isEdit}
                        imageDataStyle={this.getImageDataStyle()}
                        imageStyle={this.imageStyle} id={this.id}
                        editCallback={this.applyEditChanges.bind(this)}
                        applyChanges={this.applyChanges.bind(this)}
                        toggleEdit={this.toggleEdit.bind(this)}
            />
        );
    }
}