'use strict';
import {find, orderBy} from 'lodash';
import {CommonService} from "./commonService";

export class TagsService {
    tags = [];
    commonService = new CommonService();

    GetName(name) {
        return '[' + name + ']';
    }

    GetTagsFromApi() {
        return [
            {
                id:1,
                title:'Shops'
            },
            {
                id:2,
                title:'Electronics'
            },
            {
                id:3,
                title:'Russia'
            },
            {
                id:4,
                title:'Yaroslavl'
            },
            {
                id:5,
                title:'Cloths'
            },
            {
                id:6,
                title:'USA'
            },
            {
                id:7,
                title:'Jeans'
            }];
    }

    GetTags() {
        this.cards = this.GetCardsFromApi();
        this.cards = this.FillCardsColors(this.cards);
        return this.cards;
    }

    GetTagById(id) {
        const foundCard = find(this.tags, {id});
        return foundCard;
    }

    OrderCards(cards, key, asc) {
        const ascKey = asc ? 'asc' : 'desc';
        return orderBy(cards, [key], ascKey);
    }
}