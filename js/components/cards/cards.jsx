import GridList from 'material-ui/GridList';
import PropTypes from 'prop-types';
import React from 'react';

import { BaseComponent } from '../../BaseComponent';
import { Card } from './card/card.jsx';
import { CardPopupEdit } from './cardPopupEdit/cardPopupEdit';
import { CardsService } from '../../services/cardsService.js';
import { Container } from '../../baseComponents/container/container';
import { DimensionHelper } from '../../services/dimensionHelper.js';
import { Loader } from '../common/loader/loader';
import { OrderingPanel } from '../common/orderingPanel/orderingPanel.jsx';
import { OrderingPanelSettings } from './OrderingPanelSettings.js';
import { StyleService } from './StyleService';

import './cards.scss';

export class Cards extends BaseComponent {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    refreshDataCallback: PropTypes.func.isRequired,
  };

  state = {
    cards: this.props.cards,
    selectedCard:
      this.props.cards != null && this.props.cards.length > 0
        ? this.props.cards[0]
        : null,
    cardOpened: false,
    editing: false,
    loading: false,
  };

  constructor(props) {
    super(props);
    this.orderKeys = OrderingPanelSettings.GetOrderingKeys();

    this.openCardModal = this.openCardModal.bind(this);
    this.deleteCardCallback = this.deleteCardCallback.bind(this);
    this.closeCardModal = this.closeCardModal.bind(this);

    this.gridStyles = StyleService.GetGridStyles();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cards: nextProps.cards,
    });
  }

  reorderCards(orderKey, ascending) {
    const orderedCards = CardsService.OrderCards(
      this.state.cards,
      orderKey,
      ascending
    );
    this.setState({
      cards: orderedCards,
    });
  }

  openCardModal(id) {
    let card = CardsService.GetAddableCard();
    let isEdit = true;
    if (id !== 0) {
      card = CardsService.CloneCard(
        CardsService.GetCardById(this.state.cards, id)
      );
      isEdit = false;
      CardsService.ClickCard(id);
    }

    this.setState({ cardOpened: true, editing: isEdit, selectedCard: card });
  }

  closeCardModal(updatedCard) {
    if (updatedCard !== null) {
      if (updatedCard.id !== 0) {
        // Updating existing card
        const {cards} = this.state;
        const card = CardsService.GetCardById(this.state.cards, updatedCard.id);
        CardsService.UpdateCard(card, updatedCard);
        this.setState({ cards });
      } else {
        // Adding new card
        if (
          !CardsService.CardsAreEqual(
            CardsService.GetAddableCard(),
            updatedCard
          )
        ) {
          const {cards} = this.state;
          cards.push(CardsService.AddCard(updatedCard));
          this.setState({ cards });
        }
      }
    }

    this.setState({ cardOpened: false });
    this.props.refreshDataCallback();
  }

  deleteCardCallback(id) {
    const cards = this.state.cards.filter(card => {
      return card.id !== id;
    });
    this.setState({ cards, cardOpened: false, loading: true });

    CardsService.DeleteCard(id).then(() => {
      this.setState({ loading: false });
    });
    this.props.refreshDataCallback();
  }

  render() {
    const { cards, selectedCard, cardOpened, editing, width, loading } = this.state;
    const {orderKeys} = this;
    const maxDialogWidth = DimensionHelper.GetMaxDialogWidth(width);
    const maxDialogHeight = DimensionHelper.GetMaxDialogHeight(width);
    const columns = DimensionHelper.GetColumns(width);
    const {gridStyles} = this;

    const {openCardModal} = this;
    const {closeCardModal} = this;
    const {deleteCardCallback} = this;

    return (
      <Container>
        <OrderingPanel
          orderKey="order"
          ascending={true}
          orderKeys={orderKeys}
          callback={(orderKey, ascending) =>
            this.reorderCards(orderKey, ascending)
          }
        />
        <GridList cols={columns} cellHeight={230} style={gridStyles}>
          {cards.map((item) => (
              <Card
                key={item.id}
                card={item}
                openCardCallback={() => openCardModal(item.id)}/>
            ))}
          <Card
            key={0}
            card={CardsService.GetAddableCard()}
            openCardCallback={() => openCardModal(0)}/>
        </GridList>
        {selectedCard == null ? null : (
          <CardPopupEdit
            card={selectedCard}
            opened={cardOpened}
            isEdit={editing}
            modalWidth={maxDialogWidth}
            modalHeight={maxDialogHeight}
            closeCallback={closeCardModal}
            deleteCallback={deleteCardCallback}/>)}
        )}
        <Loader loading={loading} />
      </Container>
    );
  }
}
