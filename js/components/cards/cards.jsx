import GridList from 'material-ui/GridList';
import PropTypes from "prop-types";
import React from 'react';

import { BaseComponent } from "../../BaseComponent";
import { Card } from './card/card.jsx';
import { CardPopupEdit } from "./cardPopupEdit/cardPopupEdit";
import { CardsService } from '../../services/cardsService.js';
import { CommonService } from "../../services/commonService";
import { Container } from "../../baseComponents/container/container";
import { DimensionHelper } from "../../services/dimensionHelper.js";
import { OrderingPanel } from '../common/orderingPanel/orderingPanel.jsx';
import { OrderingPanelSettings } from './OrderingPanelSettings.js';
import { StyleService } from "./StyleService";

import './cards.less';
import {Loader} from "../common/loader/loader";

export class Cards extends BaseComponent {
    static propTypes = {
        data: PropTypes.array.isRequired
    };

    state = {
        cards: this.props.data,
        selectedCard: (this.props.data != null && this.props.data.length > 0) ? this.props.data[0] : null,
        cardOpened: false,
        editing: false,
        loading: false
    };

    constructor(props) {
        super(props);
        this.cardsService = new CardsService();
        this.dimensionHelper = new DimensionHelper();
        this.commonService = new CommonService();
        this.styleService = new StyleService();
        this.orderKeys = new OrderingPanelSettings().GetOrderingKeys();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cards: nextProps.data
        });
    }

    reorderCards(orderKey, ascending) {
        const orderedCards = CardsService.OrderCards(this.state.cards, orderKey, ascending);
        this.setState({
            cards: orderedCards
        });
    }

    openCardModal (id) {
        let card = CardsService.GetAddableCard();
        let isEdit = true;
        if (id !== 0) {
            card = CardsService.CloneCard(CardsService.GetCardById(this.state.cards, id));
            isEdit = false;
        }

        this.setState({ cardOpened: true, editing: isEdit,selectedCard: card });
    }

    closeCardModal(updatedCard) {
        if(updatedCard !== null) {
            if(updatedCard.id !== 0) {
                // Updating existing card
                const card = CardsService.GetCardById(this.state.cards, updatedCard.id);
                CardsService.UpdateCard(card, updatedCard);
            }
            else {
                // Adding new card
                if(!CardsService.CardsAreEqual(CardsService.GetAddableCard(), updatedCard)){
                    const allCards = this.state.cards;
                    allCards.push(CardsService.AddCard(updatedCard));
                    this.setState({cards: allCards});
                }
            }
        }
        this.setState({cardOpened: false});
    }

    deleteCardCallback(id) {
        const cards = this.state.cards.filter((card) => {
            return card.id !== id;
        });
        this.setState({cards, cardOpened: false, loading: true})

        CardsService.DeleteCard(id).then(() => {
           this.setState({loading: false});
        });

    }

    render() {
        const cards = this.state.cards;
        const card = this.state.selectedCard;
        const deleteCallback = this.deleteCardCallback.bind(this);
        const opened = this.state.cardOpened;
        const isEdit = this.state.editing;
        const maxDialogWidth = this.dimensionHelper.GetMaxDialogWidth(this.state.width);
        const maxDialogHeight = this.dimensionHelper.GetMaxDialogHeight(this.state.width);
        const closeCallback = this.closeCardModal.bind(this);
        const columns = this.dimensionHelper.GetColumns(this.state.width);
        const gridStyles = this.styleService.GetGridStyles();
        const orderKeys = this.orderKeys;
        const openCardModal = this.openCardModal.bind(this);

        function RenderCardPopupEdit() {
            if(card == null) return <span/>;
            return <CardPopupEdit
                card = {card}
                opened = {opened}
                isEdit = {isEdit}
                modalWidth = {maxDialogWidth}
                modalHeight = {maxDialogHeight}
                closeCallback = {closeCallback}
                deleteCallback = {deleteCallback}
            />
        }

        function RenderCards() {
            if(cards == null) return <span/>;
            return <GridList
                cols = {columns}
                cellHeight = {230}
                style = {gridStyles}
            >
                {cards.map((item) =>
                        <Card
                            key = {item.id}
                            data = {item}
                            openCardCallback = {() => openCardModal(item.id)}
                        />
                    ,this)}
                <Card
                    key = {0}
                    data = {CardsService.GetAddableCard()}
                    openCardCallback = {() => openCardModal(0)}
                />
            </GridList>
        }

        return (
            <Container>
                <OrderingPanel
                    orderKey = 'order'
                    ascending = {true}
                    orderKeys = {orderKeys}
                    callback = {(orderKey, ascending) => this.reorderCards(orderKey, ascending)}/>
                <RenderCards/>
                <RenderCardPopupEdit/>
                <Loader loading={this.state.loading}/>
            </Container>
        );
    }
}