import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import Chip from 'material-ui/Chip';
import FormData from 'form-data';
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
import {CardsService} from "../../../../services/cardsService";
import {Loader} from "../../../common/loader/loader";

export class CardEditor extends Component {
    static propTypes = {
        card: PropTypes.object.isRequired,
        callBack: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    state = {
        editableCard: this.props.card,
        backColor: this.props.card.color,
        textColor: this.props.card.textColor,
        acceptedUploads: [],
        rejectedUploads: [],
        loading: false,
        newTagName: ''
    };

    // Handlers
    handleChangeTitle(event) {
        const editableCard = this.getCardState();
        editableCard.title = event.target.value;
        this.setState({editableCard});
    }

    handleChangeCode(event) {
        const editableCard = this.getCardState();
        editableCard.code = event.target.value;
        this.setState({editableCard});
    }

    handleChangeLink(event) {
        const editableCard = this.getCardState();
        editableCard.url = event.target.value;
        this.setState({editableCard});
    }

    handleChangeNewTagName(event) {
        this.setState({ newTagName: event.target.value });
    }

    handleChangeColor(color) {
        const editableCard = this.getCardState();
        editableCard.color = color.hex;
        editableCard.textColor = CommonService.GetTextColor(this.state.editableCard.color);
        this.setState({backColor: editableCard.color, textColor: editableCard.textColor});
        this.setState({editableCard});
    }

    handleChangeImage(acceptedUploads, rejectedUploads) {
        if(acceptedUploads.length < 1) return;
        const editableCard = this.getCardState();
        editableCard.image = CommonService.CloneObject(acceptedUploads[0].preview);
        this.setState({ acceptedUploads, rejectedUploads, editableCard, loading: true});

        const data = new FormData();
        data.append("image", acceptedUploads[0]);
        data.append("title", this.state.editableCard.title);
        CardsService.UploadImage(data).then(response => {
            editableCard.image = response.data;
            this.setState({loading: false, editableCard});
        })
    }

    handleAddNewTag() {
        let newTagName = this.state.newTagName;
        if (newTagName.length === 0) {
            return;
        }
        let editableCard = this.state.editableCard;
        const indexOf = (editableCard.tags.map((tag) => tag).indexOf(newTagName));

        if (indexOf !== -1) {
            return;
        }

        editableCard.tags.push (newTagName);
        this.setState({editableCard, newTagName: ''});
    }

    handleDeleteTag(title) {
        const editableCard = this.getCardState();
        const tagToDelete = editableCard.tags.map((tag) => tag).indexOf(title);
        editableCard.tags.splice(tagToDelete, 1);
        this.setState({editableCard});
    }

    // Helpers
    getCardState() {
        return this.state.editableCard;
    }

    applyChanges() {
        this.props.callBack(this.getCardState());
        this.setState({acceptedUploads: [], rejectedUploads: []});
    }

    // Style helpers
    getContainerStyle() {
        return StyleService.GetContainerStyle(this.state.backColor, this.state.textColor);
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
            background: 'url("' + this.state.editableCard.image + '") scroll no-repeat center/cover'
        };
    }

    render() {
        return (
            <Container className = 'cardEditor'>
                <Accordion style = {this.getContainerStyle()}
                           title = {'Title'} checked={true}>
                    <input type = 'text'
                           value = {this.state.editableCard.title}
                           onChange = {this.handleChangeTitle.bind(this)}/>
                </Accordion>

                <Accordion style = {this.getContainerStyle()}
                           title = 'Image'>
                    <Dropzone
                        className = 'dragZoneImage'
                        accept = "image/jpeg, image/png"
                        onDrop = {(acceptedUploads,rejectedUploads) =>
                        { this.handleChangeImage(acceptedUploads, rejectedUploads) }}
                    >
                        <div className = "image" style = {this.getImagePreview()}/>
                    </Dropzone>
                </Accordion>

                <Accordion style = {this.getContainerStyle()}
                           title = 'Tags'>
                    <Container className = 'tags'>
                        <Container className = 'chipTags'>
                            {this.state.editableCard.tags.map((item) =>
                                    <Chip className = 'chipTag'
                                          key = {item}
                                          onRequestDelete = {() => this.handleDeleteTag(item)}
                                          style = {StyleService.GetChipStyles()}>
                                        {item}
                                    </Chip>
                                ,this)}
                        </Container>
                        <Container className = 'newTag'>
                            <input type = 'text'
                                   value = {this.state.newTagName}
                                   onChange = {this.handleChangeNewTagName.bind(this)}/>
                            <IconButton className = 'addNewTagButton'
                                        onClick = {this.handleAddNewTag.bind(this)}>
                                <AddCircleOutline
                                    color = {this.state.textColor}/>
                            </IconButton>
                        </Container>
                    </Container>
                </Accordion>

                <Accordion style = {this.getContainerStyle()}
                           title = 'BarCode'>
                    <input type = 'text'
                           value = {this.state.editableCard.code}
                           onChange = {this.handleChangeCode.bind(this)}/>
                    <Barcode code = {this.state.editableCard.code}
                             textColor = {this.state.textColor}
                             id = 'editableBarcode'/>
                </Accordion>

                <Accordion style = {this.getContainerStyle()}
                           title = 'Link'>
                    <a href = {this.state.editableCard.url}>
                        <h2 style = {{color: this.state.textColor}}>
                            {'Link to ' + this.state.editableCard.title}
                        </h2>
                    </a>
                    <input type = 'text'
                           value = {this.state.editableCard.url}
                           onChange = {this.handleChangeLink.bind(this)}/>
                </Accordion>

                <Accordion style = {this.getContainerStyle()}
                           title = 'Color'>
                    <SwatchesPicker onChange={this.handleChangeColor.bind(this)}/>
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
                <Loader loading={this.state.loading}/>
            </Container>
        );
    }
}