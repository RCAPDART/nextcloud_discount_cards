import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';

import { CardEditor } from "./cardEditor/cardEditor";
import { CardsService } from '../../../services/cardsService.js';
import { Container } from "../../../baseComponents/container/container";
import { DimensionHelper } from "../../../services/dimensionHelper";
import { Loader } from "../../common/loader/loader";
import { StyleService } from './StyleService';

import './cardPopupEdit.less';
import {CardStatic} from "./cardStatic/cardStatic";
import {ActionButtons} from "./actionButtons/actionButtons";

export class CardPopupEdit extends Component {
    static propTypes = {
        opened: PropTypes.bool.isRequired,
        card: PropTypes.object,
        isEdit: PropTypes.bool.isRequired,
        modalWidth: PropTypes.number.isRequired,
        modalHeight: PropTypes.number.isRequired,
        closeCallback: PropTypes.func.isRequired,
        deleteCallback: PropTypes.func.isRequired
    };

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

        const textColor = this.state.textColor;
        const card = this.state.openedCard;
        const closeModal = this.closeModal.bind(this);
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
                                                    <Fragment> {
                                                        edit === false ? (
                                                            <CardStatic card={card}
                                                                        modalWidth={this.props.modalWidth}/>
                                                        ) : (
                                                            <CardEditor card={card} callBack={editCallback}/>
                                                        )

                                                    }
                                                        <ActionButtons
                                                            cardId={parseInt(cardId)}
                                                            edit={edit}
                                                            textColor={textColor}
                                                            deleteCard={deleteCard}
                                                            discardChanges={discardChanges}
                                                            toggleEdit={toggleEdit}
                                                            closeModal={closeModal}/>
                                                    </Fragment>)
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