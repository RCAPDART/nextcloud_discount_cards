/* eslint-disable max-len */
'use strict';
import { cloneDeep, find, orderBy } from 'lodash';
import { CommonService } from "./commonService";
import { MockService } from "./MockService";

export class CardsService {
    cards = [];
    static colors = ['#f44336', '#ff9800', '#9c27b0', '#3f51b5', '#2196f3', '#03a9f4', '#009688', '#4caf50', '#cddc39'];

    static GetCardsFromApi() {
        return MockService.GetCardsPlaceholder();
    }

    GetCards() {
        this.cards = CardsService.GetCardsFromApi();
        this.cards = CardsService.FillCardsColors(this.cards);
        return this.cards;
    }

    static GetDefaultCard() {
        const card = {
            id: 0,
            title: "New card",
            link: '',
            code: '1234',
            order: 999999,
            img: '',
            tags: [],
            color: this.colors[Math.floor(Math.random() * this.colors.length)]
        };
        CardsService.FillCardColors(card);
        return card;
    }

    static GetAddableCard() {
        const card =  {
            id: 0,
            title: "Add card",
            link: '',
            code: '1234',
            order: 999999,
            img: '',
            tags: [],
            color: this.colors[Math.floor(Math.random() * this.colors.length)]
        };
        CardsService.FillCardColors(card);
        return card;
    }

    static FillCardsColors(cards) {
        cards.forEach((card) => {
            CardsService.FillCardColors(card);
        });
        return cards;
    }

    static CloneCard(card) {
        return cloneDeep(card);
    }

    static UpdateCard = (prevState, newState) => {
        // ToDo API call update
        prevState.title = newState.title;
        prevState.link = newState.link;
        prevState.code = newState.code;
        prevState.order = newState.order;
        prevState.img = newState.img;
        prevState.color = newState.color;
        prevState.textColor = newState.textColor;
        prevState.tags = newState.tags;
        return prevState;
    };

    static AddCard = (newCard) => {
        // ToDo API call add
        newCard.id = CommonService.GetGuid();
        return CommonService.CloneObject(newCard);
    };

    static DeleteCard = (id) => {
        // ToDo API call delete
        return id;
    };

    static CardsAreEqual (card1, card2){
        if (card1.title !== card2.title) return false;
        if (card1.code !== card2.code) return false;
        if (card1.img !== card2.img) return false;

        return true;
    }

    static FillCardColors(card) {
        card.textColor = CommonService.GetTextColor(card.color);
    }

    static GetCardById(cards, id) {
        const foundCard = find(cards, {id});
        return foundCard;
    }

    static OrderCards(cards, key, asc) {
        const ascKey = asc ? 'asc' : 'desc';
        return orderBy(cards, [key], ascKey);
    }
}