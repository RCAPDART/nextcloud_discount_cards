import axios from 'axios/index';

export class ApiService {
  static config = {
    headers: {
      Accept: '*/*',
      'OCS-APIREQUEST': true,
      requesttoken: window.oc_requesttoken,
      // requesttoken: 'dGwVInDewawKM3W0sGUooZEkECTzd6gt61H29pXUma0=:AFRwU0ikrvY+cCzD91R7k/xcUm2+HflLhWG8o8C60NQ=',
      'X-Requested-With': 'XMLHttpRequest',
    },
  };

  static getBaseUrl = () => '';

  static Get = url => axios.get(this.getBaseUrl() + url, ApiService.config);

  static Post = (url, data) => axios.post(this.getBaseUrl() + url, data, ApiService.config);
}
