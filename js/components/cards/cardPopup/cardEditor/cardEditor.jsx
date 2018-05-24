import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import Chip from 'material-ui/Chip';
import Dropzone from 'react-dropzone'
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import { Accordion } from "../../../common/accordion/accordion";
import { Barcode } from "../../../common/barcode/barcode";
import { CommonService } from "../../../../services/commonService";
import { Container } from "../../../../baseComponents/container/container";
import { StyleService } from "./StyleService";
import { SwatchesPicker } from 'react-color';

import './cardEditor.less';

export class CardEditor extends Component {
    static propTypes = {
        card: PropTypes.object.isRequired,
        callBack: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.newTagName = '';
    }

    state = {
        editableCard: this.props.card,
        backColor: this.props.card.color,
        textColor: this.props.card.textColor,
        acceptedUploads: [],
        rejectedUploads: []
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

    handleChangeNewTagName(event) {
        this.setState({ newTagName: event.target.value });
    }

    handleChangeColor(color) {
        const editableCard = this.getCardState();
        editableCard.color = color.hex;
        editableCard.textColor = CommonService.GetTextColor(this.state.editableCard.color);
        this.setState({backColor: editableCard.color, textColor: editableCard.textColor});
        this.updateCardState(editableCard);
    }

    getEditorColorStyle = {
        background: this.state.editableCard.color,
        color: CommonService.GetTextColor(this.state.editableCard.color)
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

    getContainerStyle(){
        return StyleService.GetContainerStyle(this.state.backColor, this.state.textColor);
    }

    addNewTag() {
        let newTagName = this.state.newTagName;
        if (newTagName.length === 0) {
            return;
        }
        let card = this.state.editableCard;
        const indexOf = (card.tags.map((tag) => tag.title).indexOf(newTagName));
        window.console.log(indexOf);

        if (indexOf !== -1) {
            return;
        }

        card.tags.push ({id: 0, title: newTagName});
        this.setState({editableCard: card, newTagName: ''});
    }

    deleteTag(id ){
        let card = this.state.editableCard;
        const tagToDelete = card.tags.map((tag) => tag.id).indexOf(id);
        card.tags.splice(tagToDelete, 1);
        this.setState({editableCard: card});
    }

    getImagePreview() {
        if(this.state.acceptedUploads.length > 0) {
            return {
                backgroundSize: 'cover',
                background: 'url("' + this.state.acceptedUploads[0].preview + '") scroll no-repeat center/cover'
            }
        }
        return {
            backgroundSize: 'cover',
            background: 'url("' + this.state.editableCard.img + '") scroll no-repeat center/cover'
        };
    }

    render() {
        return (
            <Container className = 'cardEditor'>
                <Accordion style = {this.getContainerStyle()}
                           title = {'Title'} checked={true}>
                    <input type = 'text' value={this.state.editableCard.title}
                           onChange={this.handleChangeTitle.bind(this)}/>
                </Accordion>
                <Accordion style = {this.getContainerStyle()}
                           title = 'Tags'>
                    <Container className = 'tags'>
                        <Container className = 'chipTags'>
                            {this.state.editableCard.tags.map((item) =>
                                    <Chip className = 'chipTag'
                                          key = {item.id}
                                          onRequestDelete = {() => this.deleteTag(item.id)}
                                          style = {StyleService.GetChipStyles()}>
                                        {item.title}
                                    </Chip>
                                ,this)}
                        </Container>
                        <Container className = 'newTag'>
                            <input type = 'text'
                                   value = {this.state.newTagName}
                                   onChange = {this.handleChangeNewTagName.bind(this)}/>
                            <IconButton className = 'addNewTagButton'
                                        onClick = {this.addNewTag.bind(this)}>
                                <AddCircleOutline
                                    color = {this.state.textColor}/>
                            </IconButton>
                        </Container>
                    </Container>
                </Accordion>

                <Accordion style = {this.getContainerStyle()}
                           title = 'BarCode'>
                    <input type = 'text' value={this.state.editableCard.code}
                           onChange = {this.handleChangeCode.bind(this)}/>
                    <Barcode code = {this.state.editableCard.code}
                             textColor = {this.state.textColor}
                             id = 'editableBarcode'/>
                </Accordion>

                <Accordion style = {this.getContainerStyle()}
                           title = 'Link'>
                    <a href = {this.state.editableCard.link}>
                        <h2 style = {{color: this.state.textColor}}>
                            {'Link to ' + this.state.editableCard.title}
                        </h2>
                    </a>
                    <input type = 'text'
                           value = {this.state.editableCard.link}
                           onChange = {this.handleChangeLink.bind(this)}/>
                </Accordion>

                <Accordion style = {this.getContainerStyle()}
                           title = 'Color'>
                    <SwatchesPicker onChange={this.handleChangeColor.bind(this)}/>
                </Accordion>

                <Accordion style = {this.getContainerStyle()}
                           title = 'Image'>
                    <Dropzone
                        className='dragZoneImage'
                        accept="image/jpeg, image/png"
                        onDrop={(acceptedUploads,rejectedUploads) =>
                        { this.setState({ acceptedUploads,rejectedUploads }); }}
                    >
                        <div className="image" style={this.getImagePreview()}>
                        </div>
                    </Dropzone>
                </Accordion>

                <Container style = {{background: this.state.backColor}}
                           className = "confirmButton"
                           onClick = {this.applyChanges.bind(this)}>
                    <span style = {{color: this.state.textColor}}>
                        Save changes
                    </span>
                    <IconButton className = 'editButton'>
                        <ModeEdit color = {this.state.textColor}/>
                    </IconButton>
                </Container>
            </Container>
        );
    }
}