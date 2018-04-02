import React from 'react';
import PropTypes from "prop-types";
import { Card } from './card/card.jsx';
import { CardPopup } from './cardPopup/cardPopup.jsx';
import { OrderingPanel } from '../common/orderingPanel/orderingPanel.jsx';
import { CardsService } from '../../services/cardsService.js';
import {BaseComponent} from "../../BaseComponent";
import {DimensionHelper} from "../../services/dimensionHelper.js";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import GridList from 'material-ui/GridList';
import './cards.less';
import {CommonService} from "../../services/commonService";

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
    };

    static propTypes = {
        data: PropTypes.array.isRequired
    }

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
        this.setState({cardOpened: true});
        this.setState({selectedCard: card});
    }

    dialogStyle() {
        return {
            dialogContent: {
                padding: '0px',
                position: 'relative',
                width: this.dimensionHelper.GetMaxDialogWidth(this.state.width)+'%',
                maxWidth: 'none'
            },
            bodyContent:{
                padding: '0px'
            },
            titleContent:{
                background: this.state.selectedCard.color,
                color: this.commonService.GetTextColor(this.state.selectedCard.color)
            }
        };
    }

    render() {
        const actions = [
            <FlatButton
                key={1}
                className='button'
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                key={2}
                className='button'
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
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
                <Dialog
                    className='dialogWindow'
                    title = {this.state.selectedCard.title}
                    modal={false}
                    autoScrollBodyContent={true}
                    open={this.state.cardOpened}
                    actions={actions}
                    contentStyle={this.dialogStyle().dialogContent}
                    bodyStyle={this.dialogStyle().bodyContent}
                    repositionOnUpdate={ true }
                    titleStyle={this.dialogStyle().titleContent}
                >
                    <div className='popupWindowContent'>
                        <CardPopup
                            card={this.state.selectedCard}
                        />
                    </div>
                </Dialog>
            </div>
        );
    }
}