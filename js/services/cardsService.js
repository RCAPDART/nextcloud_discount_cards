'use strict';
import {orderBy} from 'lodash';

export class CardsService {
	placeholder =
		'https://engine-room.armalo.net/index.php/apps/gallery/s/ygKEYo9q9mbkZxA';

	GetName(name){
		return '['+name+']';
	}
	
	GetCards() {
		return [
			{ id: 1, title: "MVideo", link: "https://mvideo.ru", code: "123", order: 2, img: this.placeholder },
			{ id: 2, title: "Mediamarkt", link: "https://mediamarkt.ru", code: "234", order: 1, img: this.placeholder },
			{ id: 3, title: "Eldorado", link: "https://eldorado.ru", code: "345", order: 4, img: this.placeholder },
			{ id: 4, title: "Svyaznoy", link: "https://ya.ru", code: "456", order: 3, img: this.placeholder },
			{ id: 5, title: "MTS", link: "https://mts.ru", code: "765", order: 5, img: this.placeholder },
            { id: 6, title: "MVideo", link: "https://mvideo.ru", code: "123", order: 6, img: this.placeholder },
            { id: 7, title: "Mediamarkt", link: "https://mediamarkt.ru", code: "234", order: 7, img: this.placeholder },
            { id: 8, title: "Eldorado", link: "https://eldorado.ru", code: "345", order: 8, img: this.placeholder },
            { id: 9, title: "Svyaznoy", link: "https://ya.ru", code: "456", order: 9, img: this.placeholder },
            { id: 10, title: "MTS", link: "https://mts.ru", code: "765", order: 5, img: this.placeholder },
            { id: 11, title: "MTS", link: "https://mts.ru", code: "765", order: 5, img: this.placeholder }
		];
	}
	
	OrderCards(cards, key, asc) {
		const ascKey = asc ? 'asc' : 'desc';
		return orderBy(cards, [key], ascKey);
	}
}