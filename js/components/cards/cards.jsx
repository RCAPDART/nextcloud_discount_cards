import React from 'react';
import PropTypes from "prop-types";
import { Card } from './card/card.jsx';
import { CardPopup } from './cardPopup/cardPopup.jsx';
import { OrderingPanel } from '../common/orderingPanel/orderingPanel.jsx';
import { CardsService } from '../../services/cardsService.js';
import {BaseComponent} from "../../BaseComponent";
import {DimensionHelper} from "../../services/dimensionHelper.js";
import FlatButton from 'material-ui/FlatButton';
import GridList from 'material-ui/GridList';
import './cards.less';
import {CommonService} from "../../services/commonService";
import {Container} from "../../baseComponents/container/container";
import {FullDialog} from "../common/fullDialog/fullDialog";

export class Cards extends BaseComponent {
    styles = {
        gridList: {
            display: 'flex'
        }
    };

    state = {
        cards: this.props.data,
        selectedCard: this.props.data[0],
        cardOpened: false,
        editing: false
    };

    static propTypes = {
        data: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.cardsService = new CardsService();
        this.dimensionHelper = new DimensionHelper();
        this.commonService = new CommonService();
        this.orderKeys = [
            {
                id: 1,
                title: 'Custom',
                key: 'order'
            },
            {
                id: 2,
                title: 'Title',
                key: 'title'
            }
        ];
    }

    handleClose = () => {
        this.setState({cardOpened: false});
    };

    reorderCards(orderKey, ascending) {
        const orderedCards = this.cardsService.OrderCards(this.state.cards, orderKey, ascending);
        this.setState({
            cards: orderedCards
        });
    }

    openCard (id) {
        const card = this.cardsService.GetCardById(this.state.cards, id);
        let isEdit = false;
        if(id===0) isEdit = true;
        this.setState({cardOpened: true, editing: isEdit,selectedCard: this.cardsService.CloneCard(card)});
    }

    applyChanges(card, editing){
        this.setState({selectedCard: card, editing: editing});
        window.console.log(this.state);
    }

    render() {
        const actions = [
            <FlatButton
                key={1}
                className='button'
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];

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
                    style={this.styles.gridList}
                >
                    {this.state.cards.map((item) =>
                        <Card
                            key={item.id}
                            data={item}
                            openCardCallback={() => this.openCard(item.id)}
                        />
                    ,this)}
                </GridList>
                <FullDialog
                    titleBackground={this.state.selectedCard.color}
                    titleTextColor={this.state.selectedCard.textColor}
                    opened={this.state.cardOpened}
                    footer={actions}
                    width={this.dimensionHelper.GetMaxDialogWidth(this.state.width)}
                    height={this.dimensionHelper.GetMaxDialogHeight(this.state.width)}
                >
                    <CardPopup
                        screenWidth={this.state.width}
                        card={this.state.selectedCard}
                        isEdit={this.state.editing}
                        applyColorChanges={this.applyChanges.bind(this)}
                    />
                </FullDialog>
            </Container>
        );
    }
}