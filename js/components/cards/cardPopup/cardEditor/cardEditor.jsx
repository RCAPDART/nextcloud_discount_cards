import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container} from "../../../../baseComponents/container/container";
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import {Barcode} from "../../../common/barcode/barcode";
import { SwatchesPicker } from 'react-color';
import './cardEditor.less';
import {CommonService} from "../../../../services/commonService";
import {Accordion} from "../../../common/accordion/accordion";

export class CardEditor extends Component {
    static propTypes = {
        card: PropTypes.object.isRequired,
        callBack: PropTypes.func.isRequired,
        applyColorCallback: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    getCommonService() {
        if (this.commonService == null)
            this.commonService = new CommonService();
        return this.commonService;
    }

    state = {
        editableCard: this.props.card,
        backColor: this.props.card.color,
        textColor: this.props.card.textColor
    };

    handleChangeTitle(event) {
        const editableCard = this.getCardState();
        editableCard.title = event.target.value;
        this.updateCardState(editableCard);
    }

    handleChangeCode(event) {
        const editableCard = this.getCardState();
        editableCard.code = event.target.value;
        this.updateCardState(editableCard);
    }

    handleChangeLink(event) {
        const editableCard = this.getCardState();
        editableCard.link = event.target.value;
        this.updateCardState(editableCard);
    }

    handleChangeColor(color) {
        const editableCard = this.getCardState();
        editableCard.color = color.hex;
        editableCard.textColor =  this.getCommonService().GetTextColor(this.state.editableCard.color);
        this.setState({backColor: editableCard.color, textColor: editableCard.textColor});
        this.props.applyColorCallback(editableCard);
        this.updateCardState(editableCard);
    }

    getEditorColorStyle = {
        background: this.state.editableCard.color,
        color: this.getCommonService().GetTextColor(this.state.editableCard.color)
    };

    getCardState() {
        return this.state.editableCard;
    }

    updateCardState(editableCard) {
        this.setState({editableCard: editableCard});
    }

    applyChanges() {
        this.props.callBack(this.getCardState());
    }

    render() {
        return (
            <Container className='cardEditor'>
                    <Accordion style={{background: this.state.backColor, color: this.state.textColor}}
                               title={'Title'} checked={true}>
                        <input type='text' value={this.state.editableCard.title}
                               onChange={this.handleChangeTitle.bind(this)}/>
                    </Accordion>
                    <Accordion style={{background: this.state.backColor, color: this.state.textColor}}
                               title='BarCode'>
                        <input type='text' value={this.state.editableCard.code}
                               onChange={this.handleChangeCode.bind(this)}/>
                        <Barcode code={this.state.editableCard.code} textColor={this.state.textColor} id='123'/>
                    </Accordion>
                    <Accordion style={{background: this.state.backColor, color: this.state.textColor}}
                               title='Link'>
                        <a href={this.state.editableCard.link}><h2 style={{color: this.state.textColor}}>
                            {'Link to ' + this.state.editableCard.title}
                            </h2></a>
                        <input type='text' value={this.state.editableCard.link}
                               onChange={this.handleChangeLink.bind(this)}/>
                    </Accordion>
                    <Accordion style={{background: this.state.backColor, color: this.state.textColor}}
                           title='Color'>
                        <SwatchesPicker onChange={this.handleChangeColor.bind(this)}/>
                    </Accordion>
                    <Container className="confirmButton" onClick={this.applyChanges.bind(this)}>
                        <span style={{color: this.state.backColor}}>Save changes</span>
                        <IconButton className='editButton' onClick={this.applyChanges.bind(this)}>
                            <ModeEdit color={this.state.backColor}/>
                        </IconButton>
                    </Container>
            </Container>
        );
    }
}