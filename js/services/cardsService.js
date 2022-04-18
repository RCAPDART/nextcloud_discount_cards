import { cloneDeep, find, orderBy } from 'lodash';
import { ApiService } from './apiService';
import { CommonService } from './commonService';

export class CardsService {
  cards = [];

  static colors = [
    '#f44336',
    '#ff9800',
    '#9c27b0',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#009688',
    '#4caf50',
    '#cddc39',
  ];

  static GetCardsFromApi = filter => ApiService.Get('cards/getCards?tags=' + filter);
  //  Promise.resolve(JSON.parse('{"data":{"data":{"cards":[{"id":"14","user_id":"RCAPDART","title":"\u0421\u0447\u0430\u0441\u0442\u043b\u0438\u0432\u044b\u0439 \u041f\u0438\u0442\u043e\u043c\u0435\u0446","description":"","code":"5010010506411","codeType":"ean13","color":"#4caf50","url":"https:\\/\\/xn----7sbgnmcfnotjrboh1ec2f.xn--p1ai\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2018-06-25_02-05-02_\u0421\u0447\u0430\u0441\u0442\u043b\u0438\u0432\u044b\u0439 \u041f\u0438\u0442\u043e\u043c\u0435\u0446.png","tags":"Pets,Yaroslavl"},{"id":"62","user_id":"RCAPDART","title":"Imaginarium","description":"","code":"1000225131588","codeType":"ean13","color":"#ffffff","url":"http:\\/\\/www.imaginarium.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_01-02-20_Imaginarium.jpeg","tags":"Kids,Shops,Toys,Yaroslavl"},{"id":"61","user_id":"RCAPDART","title":"Citilink","description":"","code":"2403305","codeType":"code39","color":"#ffffff","url":"https:\\/\\/www.citilink.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_01-01-10_Citilink.jpeg","tags":"Shops,Technics,Yaroslavl"},{"id":"60","user_id":"RCAPDART","title":"DNS - Technopoint","description":"","code":"DNS_IC391344833433753","codeType":"code128","color":"#ff6f00","url":"https:\\/\\/www.dns-shop.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_01-00-02_DNS - Technopoint.jpeg","tags":"Shops,Technics,Yaroslavl"},{"id":"56","user_id":"RCAPDART","title":"\u0410\u043f\u0442\u0435\u043a\u0430\u0440\u044c","description":"","code":"7070710079675","codeType":"ean13","color":"#4caf50","url":"http:\\/\\/www.aptekar76.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_11-02-27_\u0410\u043f\u0442\u0435\u043a\u0430\u0440\u044c.png","tags":"Pharmacy,Yaroslavl"},{"id":"54","user_id":"RCAPDART","title":"\u041e\u0431\u0443\u0432\u044c Respect","description":"","code":"9999913245169","codeType":"ean13","color":"#1976d2","url":"https:\\/\\/respect-shoes.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_10-51-56_\u041e\u0431\u0443\u0432\u044c Respect.jpeg","tags":"Clothes,Shoes,Shops,Yaroslavl"},{"id":"50","user_id":"RCAPDART","title":"Francesco Donni","description":"","code":"2000001736098","codeType":"ean13","color":"#f44336","url":"https:\\/\\/francesco.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_10-38-05_Francesco Donni.png","tags":"Clothes,Shoes,Shops,Yaroslavl"},{"id":"49","user_id":"RCAPDART","title":"Extreme Center","description":"","code":"72790080809","codeType":"code128","color":"#000000","url":"http:\\/\\/x1t.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_10-37-05_Extreme Center.png","tags":"Sport,Yaroslavl"},{"id":"48","user_id":"RCAPDART","title":"LeroyMerlin","description":"","code":"93010091995546860","codeType":"code128","color":"#ffffff","url":"https:\\/\\/leroymerlin.ru","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-03-21_05-48-56_LeroyMerlin.png","tags":"Repair,Yaroslavl"},{"id":"47","user_id":"RCAPDART","title":"\u0411\u0438\u0433\u0430\u043c","description":"","code":"2250000111680","codeType":"ean13","color":"#01579b","url":"https:\\/\\/www.bigam.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-03-21_05-45-17_\u0411\u0438\u0433\u0430\u043c.png","tags":"Repair,Yaroslavl"},{"id":"46","user_id":"RCAPDART","title":"\u0410\u0432\u0442\u043e\u0441\u0435\u0440\u0432\u0438\u0441 \u0424\u043e\u0440\u043c\u0443\u043b\u0430","description":"","code":"2001010172464","codeType":"ean13","color":"#d9d9d9","url":"http:\\/\\/www.formula76.ru","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-02-15_08-06-10_\u0410\u0432\u0442\u043e\u0441\u0435\u0440\u0432\u0438\u0441 \u0424\u043e\u0440\u043c\u0443\u043b\u0430.png","tags":"Auto,Yaroslavl"},{"id":"43","user_id":"RCAPDART","title":"\u0420\u0438\u0432 \u0413\u043e\u0448","description":"","code":"5550102116789","codeType":"ean13","color":"#ffffff","url":"http:\\/\\/www.rivegauche.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-02-15_07-52-39_\u0420\u0438\u0432 \u0413\u043e\u0448.jpeg","tags":"Cosmetics,Yaroslavl"},{"id":"41","user_id":"RCAPDART","title":"Globus","description":"","code":"2020016744550","codeType":"ean13","color":"#f57f17","url":"https:\\/\\/www.globus.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-02-15_07-32-21_Globus.jpeg","tags":"Products,Yaroslavl"},{"id":"17","user_id":"RCAPDART","title":"\u041b\u0435\u043d\u0442\u0430","description":"","code":"780015854433","codeType":"code128","color":"#ffc107","url":"https:\\/\\/www.lenta.com\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2018-06-25_02-17-26_\u041b\u0435\u043d\u0442\u0430.jpeg","tags":"Food,Yaroslavl"},{"id":"15","user_id":"RCAPDART","title":"\u041f\u0435\u0440\u0435\u043a\u0440\u0435\u0441\u0442\u043e\u043a","description":"","code":"2670690116718","codeType":"ean13","color":"#ffffff","url":"https:\\/\\/www.perekrestok.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2018-06-25_02-12-00_\u041f\u0435\u0440\u0435\u043a\u0440\u0435\u0441\u0442\u043e\u043a.png","tags":"Food,Yaroslavl"},{"id":"13","user_id":"RCAPDART","title":"\u0412\u043a\u0443\u0441\u0412\u0438\u043b\u043b","description":"","code":"5671747","codeType":"code128","color":"#8bc34a","url":"http:\\/\\/vkusvill.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2018-06-25_02-03-21_Add card.png","tags":"Food,Yaroslavl"},{"id":"34","user_id":"RCAPDART","title":"Metro-CC","description":"","code":"6430102600067240022370","codeType":"code128","color":"#01579b","url":"https:\\/\\/metro-cc.ru","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2018-06-28_08-18-07_Metro-CC.png","tags":"Food,Yaroslavl"},{"id":"35","user_id":"RCAPDART","title":"\u0410\u043a\u0441\u043e\u043d \u0410\u043a\u0442\u0438\u0432","description":"","code":"2150820441977","codeType":"code128","color":"#e64a19","url":"https:\\/\\/akson.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2018-06-30_09-52-44_\u0410\u043a\u0441\u043e\u043d \u0410\u043a\u0442\u0438\u0432.png","tags":"Repair,Yaroslavl"},{"id":"36","user_id":"RCAPDART","title":"\u0410\u043f\u0442\u0435\u043a\u0430 \u0420\u0438\u0433\u043b\u0430","description":"","code":"61559356","codeType":"ean8","color":"#4caf50","url":"http:\\/\\/www.rigla.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2018-06-30_09-55-07_\u0410\u043f\u0442\u0435\u043a\u0430 \u0420\u0438\u0433\u043b\u0430.jpeg","tags":"Pharmacy,Yaroslavl"},{"id":"37","user_id":"RCAPDART","title":"Yves Rocher","description":"","code":"100033","codeType":"code128","color":"#afb42b","url":"https:\\/\\/www.yves-rocher.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2018-06-30_09-58-28_Yves Rocher.jpeg","tags":"Cosmetics,Online"},{"id":"38","user_id":"RCAPDART","title":"\u041c\u0430\u0433\u0438\u044f \u0417\u043e\u043b\u043e\u0442\u0430","description":"","code":"3000000046975","codeType":"ean13","color":"#ffffff","url":"https:\\/\\/www.magicgold.ru\\/","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2018-06-30_10-05-28_Add card.png","tags":"Jewelery"},{"id":"39","user_id":"RCAPDART","title":"\u041a\u0430\u0440\u0443\u0441\u0435\u043b\u044c","description":"","code":"2611722730472","codeType":"ean13","color":"#00796b","url":"Http:\\/\\/karusel.ru","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2018-08-22_05-47-50_\u041a\u0430\u0440\u0443\u0441\u0435\u043b\u044c.jpeg","tags":"Products,Yaroslavl"},{"id":"40","user_id":"RCAPDART","title":"\u041a\u0440\u0430\u0441\u043d\u043e\u0435 \u0438 \u0431\u0435\u043b\u043e\u0435","description":"","code":"2020455938411","codeType":"code128","color":"#f44336","url":"","added":"0","lastmodified":"0","clickcount":"1","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2018-09-22_10-29-31_\u041a\u0440\u0430\u0441\u043d\u043e\u0435 \u0438 \u0431\u0435\u043b\u043e\u0435.jpeg","tags":"Alcohol,Products,Yaroslavl"},{"id":"66","user_id":"RCAPDART","title":"Gloria Jeans","description":"","code":"9000024478275","codeType":"ean13","color":"#bbdefb","url":"https:\\/\\/www.gloria-jeans.ru\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_01-13-29_Add card.jpeg","tags":"Clothes,Jeans,Shops,Yaroslavl"},{"id":"65","user_id":"RCAPDART","title":"Columbia","description":"","code":"1800000761210","codeType":"code128","color":"#ffffff","url":"http:\\/\\/www.columbia.ru\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_01-10-51_Columbia.png","tags":"Clothes,Shops,Yaroslavl"},{"id":"64","user_id":"RCAPDART","title":"\u041a\u0440\u0430\u0441\u043e\u0442\u043a\u0430","description":"","code":"KSV0000031970","codeType":"code128","color":"#000000","url":"http:\\/\\/kracotka.su\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_01-08-07_Add card.png","tags":"Shops,Underwear,Yaroslavl"},{"id":"63","user_id":"RCAPDART","title":"IQ Toy","description":"","code":"777000000001080947","codeType":"code128","color":"#ffffff","url":"https:\\/\\/iqtoy.ru\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_01-04-50_IQ Toy.png","tags":"Kids,Shops,Toys,Yaroslavl"},{"id":"67","user_id":"RCAPDART","title":"Solo style","description":"","code":"10686867","codeType":"ean8","color":"#000000","url":"https:\\/\\/www.solo-shoes.ru\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_01-15-21_Solo style.png","tags":"Clothes,Shoes,Shops,Yaroslavl"},{"id":"68","user_id":"RCAPDART","title":"Ostin","description":"","code":"1102762581281","codeType":"ean13","color":"#ffffff","url":"https:\\/\\/ostin.com\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_01-16-58_Ostin.jpeg","tags":"Clothes,Shops,Yaroslavl"},{"id":"59","user_id":"RCAPDART","title":"Sunlight","description":"","code":"104130289","codeType":"code128","color":"#d32f2f","url":"https:\\/\\/sunlight.net\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_12-53-09_Sunlight.png","tags":"Jewelry,Yaroslavl"},{"id":"58","user_id":"RCAPDART","title":"\u041d\u0430\u0448\u0435 \u0441\u0435\u0440\u0435\u0431\u0440\u043e","description":"","code":"999000198828","codeType":"code128","color":"#d9d9d9","url":"https:\\/\\/www.nasheserebro.ru\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_12-51-19_\u041d\u0430\u0448\u0435 \u0441\u0435\u0440\u0435\u0431\u0440\u043e.jpeg","tags":"Jewelry,Yaroslavl"},{"id":"57","user_id":"RCAPDART","title":"\u0410\u043f\u0442\u0435\u043a\u0430 \u0412\u0438\u0442\u0430","description":"","code":"000015244044","codeType":"ean13","color":"#ff5722","url":"https:\\/\\/vitaexpress.ru\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_12-48-26_\u0410\u043f\u0442\u0435\u043a\u0430 \u0412\u0438\u0442\u0430.jpeg","tags":"Pharmacy,Yaroslavl"},{"id":"55","user_id":"RCAPDART","title":"\u0423\u043b\u044b\u0431\u043a\u0430 \u0440\u0430\u0434\u0443\u0433\u0438","description":"","code":"2772024929831","codeType":"ean13","color":"#f44336","url":"https:\\/\\/www.r-ulybka.ru\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_10-58-27_\u0423\u043b\u044b\u0431\u043a\u0430 \u0440\u0430\u0434\u0443\u0433\u0438.jpeg","tags":"House chemistry,Shops,Yaroslavl"},{"id":"53","user_id":"RCAPDART","title":"\u041e\u0431\u0443\u0432\u044c \u0422\u043e\u0444\u0430","description":"","code":"900088221","codeType":"code128","color":"#ffecb3","url":"https:\\/\\/tofa.ru\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_10-48-32_\u041e\u0431\u0443\u0432\u044c \u0422\u043e\u0444\u0430.jpeg","tags":"Clothes,Shoes,Shops,Yaroslavl"},{"id":"52","user_id":"RCAPDART","title":"\u041a\u0430\u043d\u0442\u0430\u0442\u0430","description":"","code":"2000015803908","codeType":"ean13","color":"#ffffff","url":"https:\\/\\/www.cantata.ru\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_10-43-24_\u041a\u0430\u043d\u0442\u0430\u0442\u0430.jpeg","tags":"Coffee,Food,Shops,Tea,Yaroslavl"},{"id":"51","user_id":"RCAPDART","title":"Ralf Ringer","description":"","code":"200030121920","codeType":"code128","color":"#0d47a1","url":"https:\\/\\/ralf.ru\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-06-11_10-40-54_Ralf Ringer.jpeg","tags":"Clothes,Shoes,Shops,Yaroslavl"},{"id":"45","user_id":"RCAPDART","title":"\u041b\u0435\u0433\u043a\u0438\u0439 \u0428\u0430\u0433","description":"","code":"2500014862604","codeType":"ean13","color":"#880e4f","url":"http:\\/\\/www.easystep.ru\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-02-15_08-04-21_\u041b\u0435\u0433\u043a\u0438\u0439 \u0428\u0430\u0433.png","tags":"Shoes,Yaroslavl"},{"id":"44","user_id":"RCAPDART","title":"\u0425\u0438\u043c\u0447\u0438\u0441\u0442\u043a\u0430 \u0414\u0438\u0430\u043d\u0430","description":"","code":"30924147","codeType":"ean8","color":"#004d40","url":"https:\\/\\/yaroslavl.dryclean.ru\\/","added":"0","lastmodified":"0","clickcount":"0","image":"\\/remote.php\\/webdav\\/.discount_cards\\/2019-02-15_07-58-02_\u0425\u0438\u043c\u0447\u0438\u0441\u0442\u043a\u0430 \u0414\u0438\u0430\u043d\u0430.png","tags":"Dryclean,Yaroslavl"}],"tags":[{"title":"Food","id":"Food","count":"5"},{"title":"Yaroslavl","id":"Yaroslavl","count":"36"},{"title":"Pets","id":"Pets","count":"1"},{"title":"1111","id":"1111","count":"1"},{"title":"22222","id":"22222","count":"1"},{"title":"Repair","id":"Repair","count":"3"},{"title":"Pharmacy","id":"Pharmacy","count":"3"},{"title":"Cosmetics","id":"Cosmetics","count":"2"},{"title":"Online","id":"Online","count":"1"},{"title":"Jewelery","id":"Jewelery","count":"1"},{"title":"Products","id":"Products","count":"3"},{"title":"Alcohol","id":"Alcohol","count":"1"},{"title":"Dryclean","id":"Dryclean","count":"1"},{"title":"Shoes","id":"Shoes","count":"6"},{"title":"Auto","id":"Auto","count":"1"},{"title":"Sport","id":"Sport","count":"1"},{"title":"Clothes","id":"Clothes","count":"8"},{"title":"Shops","id":"Shops","count":"15"},{"title":"Coffee","id":"Coffee","count":"1"},{"title":"Tea","id":"Tea","count":"1"},{"title":"House chemistry","id":"House chemistry","count":"1"},{"title":"Jewelry","id":"Jewelry","count":"2"},{"title":"Technics","id":"Technics","count":"2"},{"title":"Kids","id":"Kids","count":"2"},{"title":"Toys","id":"Toys","count":"2"},{"title":"Underwear","id":"Underwear","count":"1"},{"title":"Jeans","id":"Jeans","count":"1"}]},"status":"success"}}'));

  static UploadImage = data => ApiService.Post('cards/uploadImage', data);

  static DeleteCard = cardId => ApiService.Get('cards/deleteCard?cardId=' + cardId);

  static ClickCard = cardId => ApiService.Post('cards/click?cardId=' + cardId);

  static AddUpdateCard = card => ApiService.Post('cards/addUpdateCard', card);

  static ProcessCards(cards) {
    cards.forEach(card => {
      card.tags = card.tags != null ? card.tags.split(',') : [];
      if (card.codeType == null) {
        card.codeType = 'code128';
      }
    });
    cards = CardsService.FillCardsColors(cards);
    return cards;
  }

  static GetAddableCard() {
    const card = {
      id: 0,
      title: 'Add card',
      url: '',
      code: '1234',
      codeType: 'code128',
      order: 999999,
      img: '',
      tags: [],
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
    };
    CardsService.FillCardColors(card);
    return card;
  }

  static FillCardsColors(cards) {
    cards.forEach(card => {
      CardsService.FillCardColors(card);
    });
    return cards;
  }

  static CloneCard(card) {
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

  static AddCard = newCard => {
    newCard.id = CommonService.GetGuid();
    return CommonService.CloneObject(newCard);
  };

  static CardsAreEqual(card1, card2) {
    if (card1.title !== card2.title) return false;
    if (card1.code !== card2.code) return false;
    if (card1.codeType !== card2.codeType) return false;
    if (card1.image !== card2.image) return false;

    return true;
  }

  static FillCardColors(card) {
    card.textColor = CommonService.GetTextColor(card.color);
  }

  static GetCardById(cards, id) {
    return find(cards, { id });
  }

  static OrderCards(cards, key, asc) {
    const ascKey = asc ? 'asc' : 'desc';
    return orderBy(cards, [key], ascKey);
  }
}
