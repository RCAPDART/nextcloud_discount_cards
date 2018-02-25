'use strict';
import {orderBy} from 'lodash';

export class CardsService {
	GetName(name){
		return '['+name+']';
	}
	
	GetCards() {
		return [
			{ id: 1, title: "MVideo", link: "https://mvideo.ru", code: "123", order: 2 },
			{ id: 2, title: "Mediamarkt", link: "https://mediamarkt.ru", code: "234", order: 1 },
			{ id: 3, title: "Eldorado", link: "https://eldorado.ru", code: "345", order: 4 },
			{ id: 4, title: "Svyaznoy", link: "https://ya.ru", code: "456", order: 3 },
			{ id: 5, title: "MTS", link: "https://mts.ru", code: "765", order: 5 }
		];
	}
	
	OrderCards(cards, key, asc) {
		const ascKey = asc ? 'asc' : 'desc';
		return orderBy(cards, [key], ascKey);
	}
}