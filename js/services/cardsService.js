'use strict';
import { ApiService } from './apiService';
import { cloneDeep, find, orderBy } from 'lodash';
import { CommonService } from './commonService';

export class CardsService {
  cards = [];
  static colors = ['#f44336', '#ff9800', '#9c27b0', '#3f51b5', '#2196f3', '#03a9f4', '#009688', '#4caf50', '#cddc39'];

  static GetCardsFromApi = (filter) => ApiService.Get('cards/getCards?tags=' + filter);

  static UploadImage = (data) => ApiService.Post('cards/uploadImage', data);

  static DeleteCard = (cardId) => ApiService.Get('cards/deleteCard?cardId=' + cardId);

  static ClickCard = (cardId) => ApiService.Post('cards/click?cardId=' + cardId);

  static AddUpdateCard = (card) => ApiService.Post('cards/addUpdateCard', card);

  static ProcessCards (cards) {
    cards.forEach((card) => {
      card.tags = card.tags != null ? card.tags.split(',') : [];
      if (card.codeType == null) {
        card.codeType = 'code128';
      }
    });
    cards = CardsService.FillCardsColors(cards);
    return cards;
  }

  static GetAddableCard () {
    const card = {
      id: 0,
      title: 'Add card',
      url: '',
      code: '1234',
      codeType: 'code128',
      order: 999999,
      img: '',
      tags: [],
      color: this.colors[Math.floor(Math.random() * this.colors.length)]
    };
    CardsService.FillCardColors(card);
    return card;
  }

  static FillCardsColors (cards) {
    cards.forEach((card) => {
      CardsService.FillCardColors(card);
    });
    return cards;
  }

  static CloneCard (card) {
    return cloneDeep(card);
  }

  static UpdateCard = (prevState, newState) => {
    prevState.title = newState.title;
    prevState.url = newState.url;
    prevState.code = newState.code;
    prevState.codeType = newState.codeType;
    prevState.order = newState.order;
    prevState.image = newState.image;
    prevState.color = newState.color;
    prevState.textColor = newState.textColor;
    prevState.tags = newState.tags;
    return prevState;
  };

  static AddCard = (newCard) => {
    newCard.id = CommonService.GetGuid();
    return CommonService.CloneObject(newCard);
  };

  static CardsAreEqual (card1, card2) {
    if (card1.title !== card2.title) return false;
    if (card1.code !== card2.code) return false;
    if (card1.codeType !== card2.codeType) return false;
    if (card1.image !== card2.image) return false;

    return true;
  }

  static FillCardColors (card) {
    card.textColor = CommonService.GetTextColor(card.color);
  }

  static GetCardById (cards, id) {
    return find(cards, { id });
  }

  static OrderCards (cards, key, asc) {
    const ascKey = asc ? 'asc' : 'desc';
    return orderBy(cards, [key], ascKey);
  }
}
