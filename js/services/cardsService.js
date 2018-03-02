'use strict';
import {orderBy} from 'lodash';

export class CardsService {
	imgPlaceholder =
		'https://images.unsplash.com/photo-1517701657121-79aa5abde62c?ixlib=rb-0.3.5&q=80&fm=jpg' +
		'&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=2823286402a9b9a6f7eb6faca5f0e6f2';

	GetName(name){
		return '['+name+']';
	}
	
	GetCards() {
		return [
			{ id: 1, title: "MVideo", link: "https://mvideo.ru", code: "123", order: 2, img: this.imgPlaceholder },
			{ id: 2, title: "Mediamarkt", link: "https://mediamarkt.ru", code: "234", order: 1, img: this.imgPlaceholder },
			{ id: 3, title: "Eldorado", link: "https://eldorado.ru", code: "345", order: 4, img: this.imgPlaceholder },
			{ id: 4, title: "Svyaznoy", link: "https://ya.ru", code: "456", order: 3, img: this.imgPlaceholder },
			{ id: 5, title: "MTS", link: "https://mts.ru", code: "765", order: 5, img: this.imgPlaceholder },
            { id: 6, title: "MVideo", link: "https://mvideo.ru", code: "123", order: 6, img: this.imgPlaceholder },
            { id: 7, title: "Mediamarkt", link: "https://mediamarkt.ru", code: "234", order: 7, img: this.imgPlaceholder },
            { id: 8, title: "Eldorado", link: "https://eldorado.ru", code: "345", order: 8, img: this.imgPlaceholder },
            { id: 9, title: "Svyaznoy", link: "https://ya.ru", code: "456", order: 9, img: this.imgPlaceholder },
            { id: 10, title: "MTS", link: "https://mts.ru", code: "765", order: 5, img: this.imgPlaceholder },
            { id: 11, title: "MTS", link: "https://mts.ru", code: "765", order: 5, img: this.imgPlaceholder }
		];
	}
	
	OrderCards(cards, key, asc) {
		const ascKey = asc ? 'asc' : 'desc';
		return orderBy(cards, [key], ascKey);
	}
}