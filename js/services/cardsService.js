/* eslint-disable max-len */
'use strict';
import { cloneDeep, find, orderBy } from 'lodash';
import { CommonService } from "./commonService";
import { MockService } from "./MockService";

export class CardsService {
    cards = [];

    static GetCardsFromApi() {
        return MockService.GetCardsPlaceholder();
    }

    GetCards() {
        this.cards = CardsService.GetCardsFromApi();
        this.cards = CardsService.FillCardsColors(this.cards);
        return this.cards;
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

    static UpdateCard(prevState, newState) {
        prevState.title = newState.title;
        prevState.link = newState.link;
        prevState.code = newState.code;
        prevState.order = newState.order;
        prevState.img = newState.img;
        prevState.color = newState.color;
        prevState.textColor = newState.textColor;
        prevState.tags = newState.tags;
        return prevState;
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