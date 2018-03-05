import React from 'react';
import PropTypes from "prop-types";
import { Card } from './card/card.jsx';
import { OrderingPanel } from '../common/orderingPanel/orderingPanel.jsx';
import { CardsService } from '../../services/cardsService.js';
import {BaseComponent} from "../../BaseComponent";
import {DimensionHelper} from "../../services/dimensionHelper.js";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import GridList from 'material-ui/GridList';
import './cards.less';

const styles = {
    gridList: {
        display: 'flex'
    },
};

export class Cards extends BaseComponent {
    state = {
        cards: this.props.data,
        selectedCard: this.props.data[0],
        cardOpened: false,
    };

    static propTypes = {
        data: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.cardsService = new CardsService();
        this.dimensionHelper = new DimensionHelper();
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

    openCard (id,b,c) {
        window.console.log('opened');
        window.console.log(id);
        window.console.log(b);
        window.console.log(c);
        // this.setState({cardOpened: true});
        // this.setState({selectedCard: card});
    }

    render() {
        const actions = [
            <FlatButton
                key={1}
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                key={2}
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

        function SelectedCard(props){
            if(props.card != null){
                return  <Card key={'selectedCard'} data={props.card}/>
            }
            return '';
        }
        return (
            <div>
                <OrderingPanel
                    orderKey='order'
                    ascending={true}
                    orderKeys={this.orderKeys}
                    callback={(orderKey, ascending) => this.reorderCards(orderKey, ascending)}/>
                <GridList
                    cols={this.dimensionHelper.GetColumns(this.state.width)}
                    cellHeight={220}
                    style={styles.gridList}
                >
                    {this.state.cards.map((item) =>
                        <Card
                            key={item.id}
                            data={item}
                            onClick={(a,b) => this.openCard(a,b,item.id)}
                        />
                    ,this)}
                </GridList>
                <Dialog
                    title = {this.state.selectedCard.title}
                    modal={true}
                    open={this.state.cardOpened}
                    actions={actions}
                >
                    <SelectedCard card={this.state.selectedCard}/>
                </Dialog>
            </div>
        );
    }
}