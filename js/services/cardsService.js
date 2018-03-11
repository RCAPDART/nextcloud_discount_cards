'use strict';
import {find, orderBy} from 'lodash';
import {CommonService} from "./commonService";

export class CardsService {
	placeholder =
		'https://engine-room.armalo.net/index.php/apps/gallery/s/ygKEYo9q9mbkZxA';
	cards = [];
	commonService = new CommonService();

	GetName(name){
		return '['+name+']';
	}
	
	GetCards() {
        this.cards = [
			{ id: 1, title: "MVideo", link: "https://mvideo.ru",
				code: "123", order: 2, img: this.placeholder, color: '#f44336' },
			{ id: 2, title: "Mediamarkt", link: "https://mediamarkt.ru",
				code: "234", order: 1, img: this.placeholder, color: '#ff9800' },
			{ id: 3, title: "Eldorado", link: "https://eldorado.ru",
				code: "345", order: 4, img: this.placeholder, color: '#9c27b0' },
			{ id: 4, title: "Svyaznoy", link: "https://ya.ru",
				code: "456", order: 3, img: this.placeholder, color: '#3f51b5'  },
			{ id: 5, title: "MTS", link: "https://mts.ru",
				code: "765", order: 5, img: this.placeholder, color: '#2196f3'  },
            { id: 6, title: "MVideo", link: "https://mvideo.ru",
				code: "123", order: 6, img: this.placeholder, color: '#03a9f4'  },
            { id: 7, title: "Mediamarkt", link: "https://mediamarkt.ru",
				code: "234", order: 7, img: this.placeholder, color: '#009688'  },
            { id: 8, title: "Eldorado", link: "https://eldorado.ru",
				code: "345", order: 8, img: this.placeholder, color: '#4caf50'  },
            { id: 9, title: "Svyaznoy", link: "https://ya.ru",
				code: "456", order: 9, img: this.placeholder, color: '#cddc39'  },
            { id: 10, title: "MTS", link: "https://mts.ru",
				code: "765", order: 5, img: this.placeholder, color: '#ff9800'  },
            { id: 11, title: "MTS", link: "https://mts.ru",
				code: "765", order: 5, img: this.placeholder, color: '#607d8b'  }
		];
        return this.cards;
	}

	FillCardColors(card){
		card.textColor = this.commonService.GetTextColor(card.color);
        card.secondColor = this.commonService.GetSecondColor(card.color);
        card.thirdColor = this.commonService.GetThirdColor(card.color);

	}

	GetCardById(cards, id){
        const foundCard = find(cards, {id});
        return foundCard;
	}
	
	OrderCards(cards, key, asc) {
		const ascKey = asc ? 'asc' : 'desc';
		return orderBy(cards, [key], ascKey);
	}
}