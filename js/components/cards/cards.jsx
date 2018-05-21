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

export class Cards extends BaseComponent {
    static propTypes = {
        data: PropTypes.array.isRequired
    };

    state = {
        cards: this.props.data,
        selectedCard: this.props.data[0],
        cardOpened: false,
        editing: false
    };

    constructor(props) {
        super(props);
        this.cardsService = new CardsService();
        this.dimensionHelper = new DimensionHelper();
        this.commonService = new CommonService();
        this.styleService = new StyleService();
        this.orderKeys = new OrderingPanelSettings().GetOrderingKeys();
    }

    reorderCards(orderKey, ascending) {
        const orderedCards = CardsService.OrderCards(this.state.cards, orderKey, ascending);
        this.setState({
            cards: orderedCards
        });
    }

    openCardModal (id) {
        const card = CardsService.CloneCard(CardsService.GetCardById(this.state.cards, id));
        let isEdit = false;
        if(id===0) isEdit = true;
        this.setState({cardOpened: true, editing: isEdit,selectedCard: card});
    }

    closeCardModal(updatedCard){
        let card = CardsService.GetCardById(this.state.cards, updatedCard.id);
        CardsService.UpdateCard(card, updatedCard);
        this.setState({cardOpened: false});
    }

    render() {
        return (
            <Container>
                <OrderingPanel
                    orderKey='order'
                    ascending={true}
                    orderKeys={this.orderKeys}
                    callback={(orderKey, ascending) => this.reorderCards(orderKey, ascending)}/>
                <GridList
                    cols={this.dimensionHelper.GetColumns(this.state.width)}
                    cellHeight={225}
                    style={this.styleService.GetGridStyles()}
                >
                    {this.state.cards.map((item) =>
                        <Card
                            key={item.id}
                            data={item}
                            openCardCallback={() => this.openCardModal(item.id)}
                        />
                    ,this)}
                </GridList>
                <CardPopupEdit
                    card={this.state.selectedCard}
                    opened={this.state.cardOpened}
                    isEdit={this.state.editing}
                    modalWidth={this.dimensionHelper.GetMaxDialogWidth(this.state.width)}
                    modalHeight={this.dimensionHelper.GetMaxDialogHeight(this.state.width)}
                    closeCallback={this.closeCardModal.bind(this)}
                />
            </Container>
        );
    }
}