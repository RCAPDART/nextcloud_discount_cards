import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container} from "../../../../baseComponents/container/container";
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import {Barcode} from "../../../common/barcode/barcode";
import { SwatchesPicker } from 'react-color';
import './cardEditor.less';
import {CommonService} from "../../../../services/commonService";

export class CardEditor extends Component {
    static propTypes = {
        card: PropTypes.object.isRequired,
        callBack: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

    }

    getCommonService(){
        if(this.commonService == null)
            this.commonService = new CommonService();
        return this.commonService;
    }

    state = {
        editableCard: this.props.card
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
        const commonService = this.getCommonService();
        const editableCard = this.getCardState();
        editableCard.color = color.hex;
        editableCard.textColor = commonService.GetTextColor(this.state.editableCard.color);
        this.updateCardState(editableCard);
    }

    getEditorColorStyle = {
        background: this.state.editableCard.color,
        color: this.getCommonService().GetTextColor(this.state.editableCard.color)
    };

    getCardState(){
        return this.state.editableCard;
    }

    updateCardState(editableCard){
        this.setState({editableCard: editableCard});
    }

    applyChanges(){
        this.props.callBack(this.getCardState());
    }

    render() {
        return (
            <Container className='cardEditor'>
                <form>
                    <Container className='editorInput'>
                        <h2>Title</h2>
                        <input type='text' value={this.state.editableCard.title}
                               onChange={this.handleChangeTitle.bind(this)}/>
                    </Container>
                    <Container className='editorInput'>
                        <h2>BarCode</h2>
                        <input type='text' value={this.state.editableCard.code}
                               onChange={this.handleChangeCode.bind(this)}/>
                        <Barcode code={this.state.editableCard.code} id='123'/>
                    </Container>
                    <Container className='editorInput'>
                        <a href={this.state.editableCard.link}><h2>{'Link to ' + this.state.editableCard.title}</h2></a>
                        <input type='text' value={this.state.editableCard.link}
                               onChange={this.handleChangeLink.bind(this)}/>
                    </Container>
                    <Container className='editorInput' style={this.getEditorColorStyle}>
                        <h2>Color</h2>
                        <SwatchesPicker onChange={this.handleChangeColor.bind(this)} value={this.state.editableCard.color}/>
                    </Container>
                    <IconButton className='editButton' onClick = {this.applyChanges.bind(this)}>
                        <span>Save changes</span>
                        <ModeEdit color={this.state.editableCard.color}/>
                    </IconButton>
                </form>
            </Container>
        );
    }
}