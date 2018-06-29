import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { ActionButtons } from './actionButtons/actionButtons';
import { CardPopupContent } from './cardPopupContent/cardPopupContent';
import { CardsService } from '../../../services/cardsService.js';
import { Container } from '../../../baseComponents/container/container';
import { Loader } from '../../common/loader/loader';
import { StyleService } from './StyleService';

import './cardPopupEdit.less';

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

  constructor (props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.discardChanges = this.discardChanges.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.editCallback = this.editCallback.bind(this);
    this.acceptDelete = this.acceptDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  componentWillReceiveProps (nextProps) {
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

  toggleEdit () {
    this.applyStateChanges(true, CardsService.CloneCard(this.state.editedCard));
  }

  discardChanges () {
    this.applyStateChanges(false, CardsService.CloneCard(this.props.card));
  }

  editCallback (updatedCard) {
    this.setState({ loading: true });
    CardsService.AddUpdateCard({ card: updatedCard }).then(() => {
      this.setState({ loading: false, editedCard: updatedCard });
      this.applyStateChanges(false, updatedCard);
    });
  }

  closeModal () {
    this.props.closeCallback(this.state.editedCard);
  }

  deleteCard () {
    this.setState({ modalForDeleteCardOpened: true });
  }

  cancelDelete () {
    this.setState({ modalForDeleteCardOpened: false });
  }

  acceptDelete () {
    this.props.deleteCallback(this.props.card.id);
  }

  applyStateChanges (isEdit, card) {
    let title = card.title;
    let color = card.color;
    let textColor = card.textColor;
    if (isEdit) {
      title = 'Editing "' + title + '"';
      color = 'black';
      textColor = 'white';
    }
    this.setState({ title, color, textColor, isEdit, openedCard: card });
  }

  render () {
    const { textColor, isEdit, title, openedCard, loading } = this.state;
    const { opened, modalWidth } = this.props;

    const windowStyle = StyleService.GetWindowStyles(this.props.modalWidth, this.props.modalHeight);
    const titleStyle = StyleService.GetTitleStyles(this.state.color, this.state.textColor);

    const closeModal = this.closeModal;
    const deleteCard = this.deleteCard;
    const discardChanges = this.discardChanges;
    const toggleEdit = this.toggleEdit;
    const editCallback = this.editCallback;
    const acceptDelete = this.acceptDelete;
    const cancelDelete = this.cancelDelete;

    const actions = [
      <FlatButton
        key='Delete'
        label="Delete"
        primary={true}
        onClick={acceptDelete}
      />,
      <FlatButton
        key='Cancel'
        label="Cancel"
        primary={true}
        onClick={cancelDelete}
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
                  <CardPopupContent
                    card={openedCard}
                    edit={isEdit}
                    deleteCard={deleteCard}
                    discardChanges={discardChanges}
                    editCallback={editCallback}
                    toggleEdit={toggleEdit}
                    closeModal={closeModal}
                    modalWidth={modalWidth}/>
                  <ActionButtons
                    cardId={parseInt(openedCard.id)}
                    edit={isEdit}
                    textColor={textColor}
                    deleteCard={deleteCard}
                    discardChanges={discardChanges}
                    toggleEdit={toggleEdit}
                    closeModal={closeModal} />
                  <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.modalForDeleteCardOpened}
                    onRequestClose={cancelDelete}
                  >
                      Delete card?
                  </Dialog>
                  <Loader loading={loading} />
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>)
        : null
    );
  }
}
