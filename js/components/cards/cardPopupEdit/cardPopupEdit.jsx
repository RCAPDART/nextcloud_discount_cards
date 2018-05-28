import Chip from 'material-ui/Chip';
import Clear from 'material-ui/svg-icons/content/clear';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Undo from 'material-ui/svg-icons/content/undo';

import { Barcode } from "../../common/barcode/barcode";
import { CardEditor } from "../cardPopup/cardEditor/cardEditor";
import { CardsService } from '../../../services/cardsService.js';
import { CommonService } from "../../../services/commonService";
import { Container } from "../../../baseComponents/container/container";
import { DimensionHelper } from "../../../services/dimensionHelper";
import { StyleService } from './StyleService';

import './cardPopupEdit.less';

export class CardPopupEdit extends Component {
    static propTypes = {
        opened: PropTypes.bool.isRequired,
        card: PropTypes.object,
        isEdit: PropTypes.bool.isRequired,
        modalWidth: PropTypes.number.isRequired,
        modalHeight: PropTypes.any.isRequired,
        closeCallback: PropTypes.func.isRequired,
        deleteCallback: PropTypes.func.isRequired
    };
    id = '';

    state = {
        isEdit: this.props.isEdit,
        openedCard: this.props.card,
        editedCard: this.props.card,
        color: this.props.card.color,
        textColor: this.props.card.textColor,
        title: this.props.card.title,
        modalForDeleteCardOpened: false
    };

    constructor(props) {
        super(props);
        this.dimensionHelper = new DimensionHelper();
        this.id = CommonService.GetGuid();
        this.styleService = new StyleService();
        this.cardsService = new CardsService();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.opened) return;
        this.setState({
            modalForDeleteCardOpened: false,
            openedCard: CardsService.CloneCard(nextProps.card),
            color: nextProps.card.color,
            editedCard: nextProps.card,
            textColor: nextProps.card.textColor,
            title: nextProps.card.title,
            isEdit: nextProps.isEdit});
    }

    toggleEdit() {
        this.applyStateChanges(true, CardsService.CloneCard(this.state.editedCard));
    }

    discardChanges(){
        this.applyStateChanges(false, CardsService.CloneCard(this.props.card));
    }

    applyEditChanges(updatedCard) {
        this.setState({editedCard: updatedCard});
        this.applyStateChanges(false, updatedCard);
    }

    closeModal() {
        this.props.closeCallback(this.state.editedCard);
    }

    deleteCard() {
        this.setState({modalForDeleteCardOpened: true});
    }

    cancelDelete(){
        this.setState({modalForDeleteCardOpened: false});
    }

    acceptDelete(){
        this.props.deleteCallback(this.props.card.id);
    }

    applyStateChanges(isEdit, card) {
        let title = card.title;
        let color = card.color;
        let textColor = card.textColor;
        if(isEdit){
            title = 'Editing "' + title + '"';
            color = 'black';
            textColor = 'white';
        }
        this.setState({title, color, textColor, isEdit, openedCard: card});
    }

    render() {
        const discardChanges = this.discardChanges.bind(this);
        const toggleEdit = this.toggleEdit.bind(this);

        function DrawEditButtons(props) {
            if(props.cardId === 0) return null;
            if(props.edit) {
                return <IconButton className='editButton' onClick = {discardChanges}>
                    <Undo color={props.textColor}/>
                </IconButton>
            }
            return <IconButton className='editButton' onClick = {toggleEdit}>
                <ModeEdit color={props.textColor}/>
            </IconButton>
        }

        function DrawDeleteButton(props) {
            if(props.cardId === 0) return null;
            return <IconButton className = 'editButton' onClick = {props.deleteCard}>
                <DeleteForever  color = {props.textColor}/>
            </IconButton>;
        }

        function DrawButtons(props) {
            return <Fragment>
                <DrawDeleteButton
                    deleteCard = {props.deleteCard}
                    textColor = {props.textColor}
                    cardId = {props.card.id}
                />
                <DrawEditButtons
                    edit = {props.edit}
                    cardId = {props.card.id}
                    textColor = {props.textColor}
                />
                <IconButton className = 'editButton' onClick = {props.closeModal}>
                    <Clear color = {props.textColor}/>
                </IconButton>
            </Fragment>
        }

        function DrawCard(props) {
            if (!props.edit) {
                return <Container className = 'cardPopup'>
                    <Container className = 'imageData' style = {props.imageDataStyle}>
                        <Container className = 'image' style = {props.imageStyle}/>
                    </Container>
                    <Container className = 'chipTags'>
                        {props.card.tags.map((item) =>
                                <Chip className = 'chipTag' key = {item.id} style={props.chipStyles}>
                                    {item.title}
                                </Chip>
                            ,this)}
                    </Container>
                    <Container className = 'barcodeData'>
                        <Barcode code = {props.card.code} id = {props.id}/>
                    </Container>
                </Container>
            }
            return <CardEditor card={props.card} callBack={props.editCallback}/>
        }

        function RenderCard(props) {
            if (props.card != null) {
                return <Container>
                    <DrawCard
                        id = {props.id}
                        edit = {props.edit}
                        imageDataStyle = {props.imageDataStyle}
                        imageStyle = {props.imageStyle}
                        card = {props.card}
                        editCallback = {props.editCallback}
                        chipStyles = {props.chipStyles}
                    />
                    <Container className = 'buttons'>
                        <DrawButtons
                            id = {props.id}
                            textColor = {props.textColor}
                            edit = {props.edit}
                            card = {props.card}
                            deleteCard = {props.deleteCard}
                            closeModal = {props.closeModal}
                        />
                    </Container>
                </Container>
            }
            return <span/>;
        }
        function RenderDialog(props) {
            if (!props.opened)
                return null;
            return <Container className = 'fullDialog'>
                <Container className = {'back'}>
                    <Container className = {'dialogWindow'} style = {props.windowStyle}>
                        <Container className = 'dialogContent'>
                            <Container className = 'title' style = {props.titleStyle}>
                                <h3 style = {props.titleStyle}>{props.title}</h3>
                            </Container>
                            <Container className = 'content'>
                                {props.children}
                            </Container>
                        </Container>
                    </Container>
                </Container>
            </Container>
        }
        const actions = [
            <FlatButton
                key = 'Delete'
                label = "Delete"
                primary = {true}
                onClick = {this.acceptDelete.bind(this)}
            />,
            <FlatButton
                key = 'Cancel'
                label = "Cancel"
                primary = {true}
                onClick = {this.cancelDelete.bind(this)}
            />
        ];
        return (
            <RenderDialog
                title = {this.state.title}
                opened = {this.props.opened}
                titleStyle = {this.styleService.GetTitleStyles(this.state.color,
                    this.state.textColor)}
                windowStyle = {this.styleService.GetWindowStyles(this.props.modalWidth, this.props.modalHeight)}
            >
                <RenderCard
                    textColor = {this.state.textColor}
                    card = {this.state.openedCard}
                    edit = {this.state.isEdit}
                    imageDataStyle = {this.styleService.GetImageDataStyle(this.state.openedCard.color,
                        this.dimensionHelper.GetCardImageHeight(this.props.modalWidth))}
                    imageStyle = {this.styleService.GetImageStyle(this.state.openedCard.img)}
                    id = {this.id}
                    editCallback = {this.applyEditChanges.bind(this)}
                    closeModal = {this.closeModal.bind(this)}
                    chipStyles = {this.styleService.GetChipStyles()}
                    deleteCard = {this.deleteCard.bind(this)}
                />
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.modalForDeleteCardOpened}
                    onRequestClose={this.cancelDelete.bind(this)}
                >
                    Delete card?
                </Dialog>
            </RenderDialog>
        );
    }
}