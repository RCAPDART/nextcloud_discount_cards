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
import {Loader} from "../../common/loader/loader";

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
        color: this.props.card != null ? this.props.card.color : null,
        textColor: this.props.card != null ? this.props.card.textColor : null,
        title: this.props.card != null ? this.props.card.title : null,
        modalForDeleteCardOpened: false,
        loading: false
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
            isEdit: nextProps.isEdit
        });
    }

    toggleEdit() {
        this.applyStateChanges(true, CardsService.CloneCard(this.state.editedCard));
    }

    discardChanges() {
        this.applyStateChanges(false, CardsService.CloneCard(this.props.card));
    }

    applyEditChanges(updatedCard) {
        this.setState({loading: true});
        CardsService.AddUpdateCard({card: updatedCard}).then(() => {
            this.setState({loading: false, editedCard: updatedCard});
            this.applyStateChanges(false, updatedCard);
        });
    }

    closeModal() {
        this.props.closeCallback(this.state.editedCard);
    }

    deleteCard() {
        this.setState({modalForDeleteCardOpened: true});
    }

    cancelDelete() {
        this.setState({modalForDeleteCardOpened: false});
    }

    acceptDelete() {
        this.props.deleteCallback(this.props.card.id);
    }

    applyStateChanges(isEdit, card) {
        let title = card.title;
        let color = card.color;
        let textColor = card.textColor;
        if (isEdit) {
            title = 'Editing "' + title + '"';
            color = 'black';
            textColor = 'white';
        }
        this.setState({title, color, textColor, isEdit, openedCard: card});
    }

    render() {
        const discardChanges = this.discardChanges.bind(this);
        const toggleEdit = this.toggleEdit.bind(this);
        const title = this.state.title;
        const titleStyle = this.styleService.GetTitleStyles(
            this.state.color,
            this.state.textColor);
        const opened = this.props.opened;
        const windowStyle = this.styleService.GetWindowStyles(this.props.modalWidth, this.props.modalHeight);
        const cardId = this.state.openedCard.id;
        const edit = this.state.isEdit;
        const editCallback = this.applyEditChanges.bind(this);
        const imageDataStyle = this.styleService.GetImageDataStyle(this.state.openedCard.color,
            this.dimensionHelper.GetCardImageHeight(this.props.modalWidth));
        const imageStyle = this.styleService.GetImageStyle(this.state.openedCard.image);

        const textColor = this.state.textColor;
        const card = this.state.openedCard;
        //const isEdit = this.state.isEdit;
        const id = this.id;
        const closeModal = this.closeModal.bind(this);
        const chipStyles = this.styleService.GetChipStyles();
        const deleteCard = this.deleteCard.bind(this);

        const actions = [
            <FlatButton
                key='Delete'
                label="Delete"
                primary={true}
                onClick={this.acceptDelete.bind(this)}
            />,
            <FlatButton
                key='Cancel'
                label="Cancel"
                primary={true}
                onClick={this.cancelDelete.bind(this)}
            />
        ];


        function DrawEditButtons() {
            if (cardId === 0) return <span/>;
            if (edit) {
                return <IconButton className='editButton' onClick={discardChanges}>
                    <Undo color={textColor}/>
                </IconButton>
            }
            return <IconButton className='editButton' onClick={toggleEdit}>
                <ModeEdit color={textColor}/>
            </IconButton>
        }

        function DrawDeleteButton() {
            if (cardId === 0) return <span/>;
            return <IconButton className='editButton' onClick={deleteCard}>
                <DeleteForever color={textColor}/>
            </IconButton>;
        }

        function DrawButtons(props) {
            return <Fragment>
                <DrawDeleteButton
                    deleteCard={props.deleteCard}
                    textColor={textColor}
                />
                <DrawEditButtons
                    edit={edit}
                    textColor={textColor}
                />
                <IconButton className='editButton' onClick={closeModal}>
                    <Clear color={textColor}/>
                </IconButton>
            </Fragment>
        }

        return (
            opened === true ? (
                    <Container className='fullDialog'>
                        <Container className={'back'}>
                            <Container className={'dialogWindow'} style={windowStyle}>
                                <Container className='dialogContent'>
                                    <Container className='title' style={titleStyle}>
                                        <h3 style={titleStyle}>{title}</h3>
                                    </Container>
                                    <Container className='content'>
                                        {
                                            card != null ? (
                                                    <Container>
                                                        {
                                                            edit === false ? (
                                                                <Container className='cardPopup'>
                                                                    <Container className='imageData'
                                                                               style={imageDataStyle}>
                                                                        <Container className='image'
                                                                                   style={imageStyle}/>
                                                                    </Container>
                                                                    <Container className='chipTags'>
                                                                        {card.tags.map((item) =>
                                                                                <Chip className='chipTag' key={item}
                                                                                      style={chipStyles}>
                                                                                    {item}
                                                                                </Chip>
                                                                            , this)}
                                                                    </Container>
                                                                    <Container className='barcodeData'>
                                                                        <Barcode code={card.code} id={id}/>
                                                                    </Container>
                                                                </Container>
                                                            ) : (
                                                                <CardEditor card={card} callBack={editCallback}/>
                                                            )

                                                        }
                                                        <Container className='buttons'>
                                                            <DrawButtons
                                                                id={id}
                                                                textColor={textColor}
                                                                card={card}
                                                                deleteCard={deleteCard}
                                                                closeModal={closeModal}
                                                            />
                                                        </Container>
                                                    </Container>)
                                                : (<span/>)

                                        }
                                        <Dialog
                                            actions={actions}
                                            modal={false}
                                            open={this.state.modalForDeleteCardOpened}
                                            onRequestClose={this.cancelDelete.bind(this)}
                                        >
                                            Delete card?
                                        </Dialog>
                                        <Loader loading={this.state.loading}/>
                                    </Container>
                                </Container>
                            </Container>
                        </Container>
                    </Container>)
                : (<span/>)
        );
    }
}